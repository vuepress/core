import { createRequire } from 'node:module'

import type { RspackChain } from 'rspack-chain'

import { resolveEsbuildLoaderOptions } from './resolveEsbuildLoaderOptions.js'

const require = createRequire(import.meta.url)

/**
 * Set rspack module to handle ts files
 */
export const handleModuleTs = ({ config }: { config: RspackChain }): void => {
  config.module
    .rule('ts')
    .test(/\.tsx?/)
    // use esbuild-loader
    .use('esbuild-loader')
    .loader(require.resolve('esbuild-loader'))
    .options(
      resolveEsbuildLoaderOptions({
        loader: 'tsx',
      }),
    )
    .end()
}
