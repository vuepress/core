import { pathToFileURL } from 'node:url'

import { fs, hash, importFileDefault, path } from '@vuepress/utils'
import { rolldown } from 'rolldown'
import type { OutputChunk } from 'rolldown'

import type { UserConfig } from '../types/index.js'

function collectAllModules(
  chunks: Record<string, OutputChunk | undefined>,
  fileName: string,
  set: Set<string>,
): void {
  const chunk = chunks[fileName]
  if (!chunk) return
  for (const modId of chunk.moduleIds) {
    if (!set.has(modId)) {
      set.add(modId)
      for (const importFileName of chunk.imports) {
        collectAllModules(chunks, importFileName, set)
      }
    }
  }
}

/**
 * Load user config file
 */
export const loadUserConfig = async (
  userConfigPath?: string,
): Promise<{
  userConfig: UserConfig
  userConfigDependencies: string[]
}> => {
  if (!userConfigPath) {
    return {
      userConfig: {},
      userConfigDependencies: [],
    }
  }

  // forked and modified from https://github.com/vitejs/vite/blob/main/packages/vite/src/node/config.ts
  const dirnameVarName = '__vite_injected_original_dirname'
  const filenameVarName = '__vite_injected_original_filename'
  const importMetaUrlVarName = '__vite_injected_original_import_meta_url'
  const importMetaResolveVarName =
    '__vite_injected_original_import_meta_resolve'
  const importMetaResolveRegex = /import\.meta\s*\.\s*resolve/

  const bundle = await rolldown({
    input: userConfigPath,
    platform: 'node',
    resolve: {
      mainFields: ['main'],
    },
    transform: {
      define: {
        '__dirname': dirnameVarName,
        '__filename': filenameVarName,
        'import.meta.url': importMetaUrlVarName,
        'import.meta.dirname': dirnameVarName,
        'import.meta.filename': filenameVarName,
        'import.meta.resolve': importMetaResolveVarName,
        'import.meta.main': 'false',
      },
    },
    treeshake: false,
    tsconfig: false,
    plugins: [
      {
        name: 'externalize-deps',
        resolveId: {
          filter: { id: /^[^.#].*/ },
          handler(id, importer) {
            // externalize bare imports
            if (!importer || path.isAbsolute(id)) {
              return
            }

            return { id, external: true }
          },
        },
      },
      {
        name: 'inject-file-scope-variables',
        transform: {
          filter: { id: /\.[cm]?[jt]s$/ },
          handler(code, id) {
            let injectValues =
              `const ${dirnameVarName} = ${JSON.stringify(path.dirname(id))};` +
              `const ${filenameVarName} = ${JSON.stringify(id)};` +
              `const ${importMetaUrlVarName} = ${JSON.stringify(
                pathToFileURL(id).href,
              )};`

            if (importMetaResolveRegex.test(code)) {
              injectValues += `const ${importMetaResolveVarName} = (specifier, importer = ${importMetaUrlVarName}) => import.meta.resolve(specifier, importer);`
            }

            let injectedContents: string
            if (code.startsWith('#!')) {
              // hashbang
              let firstLineEndIndex = code.indexOf('\n')
              if (firstLineEndIndex < 0) firstLineEndIndex = code.length
              injectedContents =
                code.slice(0, firstLineEndIndex + 1) +
                injectValues +
                code.slice(firstLineEndIndex + 1)
            } else {
              injectedContents = injectValues + code
            }

            return {
              code: injectedContents,
              map: null,
            }
          },
        },
      },
    ],
  })

  const result = await bundle.generate({
    format: 'esm',
    sourcemap: 'inline',
    sourcemapPathTransform(relative) {
      return path.resolve(path.dirname(userConfigPath), relative)
    },
    codeSplitting: false,
  })
  await bundle.close()

  const entryChunk = result.output.find(
    (chunk): chunk is OutputChunk => chunk.type === 'chunk' && chunk.isEntry,
  )!

  const bundleChunks = Object.fromEntries(
    result.output.flatMap((c) => (c.type === 'chunk' ? [[c.fileName, c]] : [])),
  )

  const userConfigDependencies: string[] = []
  const seen = new Set<string>()
  collectAllModules(bundleChunks, entryChunk.fileName, seen)
  for (const modId of seen) {
    if (!modId.startsWith('\0')) {
      userConfigDependencies.push(modId)
    }
  }

  // add hash to temp file name to avoid naming conflict, and avoid import cache when reloading in dev mode.
  // notice that currently we could not delete import cache when using esm like cjs `require.cache`, so it
  // could be kind of "memory leak" after modifying and reloading config file too many times.
  const { code: text } = entryChunk
  const tempFilePath = `${userConfigPath}.${hash(text)}.mjs`
  let userConfig: UserConfig
  try {
    await fs.writeFile(tempFilePath, text)
    userConfig = await importFileDefault(tempFilePath)
  } finally {
    fs.unlink(tempFilePath, () => {}) // Ignore errors
  }

  return {
    userConfig,
    userConfigDependencies,
  }
}
