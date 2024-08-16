import { createRequire } from 'node:module'
import type Config from 'webpack-5-chain'
import { resolveEsbuildJsxOptions } from './resolveEsbuildJsxOptions.js'

const require = createRequire(import.meta.url)

/**
 * Set webpack module to handle ts files
 */
export const handleModuleTs = ({ config }: { config: Config }): void => {
  config.module
    .rule('ts')
    .test(/\.tsx?/)
    // use esbuild-loader
    .use('esbuild-loader')
    .loader(require.resolve('esbuild-loader'))
    .options({
      target: 'es2018',
      loader: 'tsx',
      ...resolveEsbuildJsxOptions(),
    })
    .end()
}
