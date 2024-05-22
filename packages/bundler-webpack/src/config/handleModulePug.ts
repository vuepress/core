import type Config from 'webpack-5-chain'

/**
 * Set webpack module to handle pug files
 */
export const handleModulePug = ({ config }: { config: Config }): void => {
  config.module
    .rule('pug')
    .test(/\.pug$/)
    .use('pug-plain-loader')
    .loader('pug-plain-loader')
}
