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
