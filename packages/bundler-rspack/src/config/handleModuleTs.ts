import type { RspackChain } from 'rspack-chain'

import { resolveSwcLoaderOptions } from './resolveSwcLoaderOptions.js'

/**
 * Set rspack module to handle ts files
 */
export const handleModuleTs = ({ config }: { config: RspackChain }): void => {
  config.module
    .rule('ts')
    .test(/\.tsx?/)
    // use swc-loader
    .use('swc-loader')
    .loader('builtin:swc-loader')
    .options(resolveSwcLoaderOptions({}, true))
    .end()
}
