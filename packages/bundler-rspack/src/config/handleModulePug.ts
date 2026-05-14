import type { RspackChain } from 'rspack-chain'

/**
 * Set webpack module to handle pug files
 */
export const handleModulePug = ({ config }: { config: RspackChain }): void => {
  config.module
    .rule('pug')
    .test(/\.pug$/)
    .use('pug-plain-loader')
    .loader('pug-plain-loader')
}
