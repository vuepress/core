import { createRequire } from 'node:module'
import type { VueLoaderOptions } from 'vue-loader'
import { VueLoaderPlugin } from 'vue-loader'
import type { Config } from 'webpack-v5-chain'
import type { WebpackBundlerOptions } from '../types.js'

const require = createRequire(import.meta.url)

/**
 * Set webpack module to handle vue files
 */
export const handleModuleVue = ({
  options,
  config,
  isServer,
}: {
  options: WebpackBundlerOptions
  config: Config
  isServer: boolean
}): void => {
  // .vue files
  config.module
    .rule('vue')
    .test(/\.vue$/)
    // use vue-loader
    .use('vue-loader')
    .loader(require.resolve('vue-loader'))
    .options({
      ...options.vue,
      isServerBuild: isServer,
    } as VueLoaderOptions)
    .end()

  // use vue-loader plugin
  config.plugin('vue-loader').use(VueLoaderPlugin)
}
