import { createRequire } from 'node:module'
import type { App } from '@vuepress/core'
import { VueLoaderPlugin } from 'vue-loader'
import type { VueLoaderOptions } from 'vue-loader'
import type Config from 'webpack-chain'
import type { WebpackBundlerOptions } from '../types.js'

const require = createRequire(import.meta.url)

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
    .loader(require.resolve('vue-loader'))
    .options({
      ...options.vue,
      isServerBuild: isServer,
    } as VueLoaderOptions)
    .end()

  // use vue-loader plugin
  config.plugin('vue-loader').use(VueLoaderPlugin)
}
