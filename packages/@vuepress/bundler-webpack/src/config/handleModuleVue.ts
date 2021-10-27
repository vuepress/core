import type { App } from '@vuepress/core'
import { VueLoaderPlugin } from 'vue-loader'
import type { VueLoaderOptions } from 'vue-loader'
import type * as Config from 'webpack-chain'
import type { WebpackBundlerOptions } from '../types'

/**
 * Set webpack module to handle vue files
 */
export const handleModuleVue = ({
  app,
  options,
  config,
  isServer,
}: {
  app: App
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
    .loader('vue-loader')
    .options({
      ...options.vue,
      isServerBuild: isServer,
    } as VueLoaderOptions)
    .end()

  // use vue-loader plugin
  config.plugin('vue-loader').use(VueLoaderPlugin)
}
