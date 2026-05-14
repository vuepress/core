import type { RspackChain } from 'rspack-chain'

/**
 * Set rspack module to handle pug files
 */
export const handleModulePug = ({ config }: { config: RspackChain }): void => {
  config.module
    .rule('pug')
    .test(/\.pug$/)
    .use('pug-loader')
    .loader('@rsbuild/plugin-pug')
}
