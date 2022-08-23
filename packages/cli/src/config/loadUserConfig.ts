import { pathToFileURL } from 'node:url'
import { fs, hash, importFileDefault, path } from '@vuepress/utils'
import { build } from 'esbuild'
import type { UserConfig } from './types.js'

/**
 * Load user config file
 */
export const loadUserConfig = async (
  userConfigPath?: string
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
  // following code is forked and modified from vite
  // TODO: we can migrate to something like `bundler-require`, but its `__dirname` support is not as good as vite
  const dirnameVarName = '__vite_injected_original_dirname'
  const filenameVarName = '__vite_injected_original_filename'
  const importMetaUrlVarName = '__vite_injected_original_import_meta_url'
  const result = await build({
    absWorkingDir: process.cwd(),
    entryPoints: [userConfigPath],
    outfile: 'out.js',
    write: false,
    target: ['node14.18', 'node16'],
    platform: 'node',
    bundle: true,
    format: 'esm',
    sourcemap: 'inline',
    metafile: true,
    define: {
      '__dirname': dirnameVarName,
      '__filename': filenameVarName,
      'import.meta.url': importMetaUrlVarName,
    },
    plugins: [
      {
        name: 'externalize-deps',
        setup(build) {
          build.onResolve({ filter: /.*/ }, ({ path: id }) => {
            // externalize bare imports
            if (id[0] !== '.' && !path.isAbsolute(id)) {
              return {
                external: true,
              }
            }
            return null
          })
        },
      },
      {
        name: 'inject-file-scope-variables',
        setup(build) {
          build.onLoad({ filter: /\.[cm]?[jt]s$/ }, async (args) => {
            const contents = await fs.readFile(args.path, 'utf8')
            const injectValues =
              `const ${dirnameVarName} = ${JSON.stringify(
                path.dirname(args.path)
              )};` +
              `const ${filenameVarName} = ${JSON.stringify(args.path)};` +
              `const ${importMetaUrlVarName} = ${JSON.stringify(
                pathToFileURL(args.path).href
              )};`

            return {
              loader: args.path.endsWith('ts') ? 'ts' : 'js',
              contents: injectValues + contents,
            }
          })
        },
      },
    ],
  })

  // add hash to temp file name to avoid naming conflict, and avoid import cache when reloading in dev mode.
  // notice that currently we could not delete import cache when using esm like cjs `require.cache`, so it
  // could be kind of "memory leak" after modifying and reloading config file too many times.
  const { text } = result.outputFiles[0]
  const tempFilePath = `${userConfigPath}.${hash(text)}.mjs`
  let userConfig: UserConfig
  try {
    await fs.writeFile(tempFilePath, text)
    userConfig = await importFileDefault(tempFilePath)
  } finally {
    await fs.rm(tempFilePath)
  }
  return {
    userConfig,
    userConfigDependencies: Object.keys(result.metafile?.inputs ?? {}),
  }
}
