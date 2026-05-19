import type {
  WebpackBundlerOptions,
  WebpackChainConfig,
} from '@vuepress/bundler-webpack'
import type { App } from '@vuepress/core'

import { getBundlerName } from '../getBundlerName.js'

/**
 * Chain webpack
 *
 * @param bundlerOptions - VuePress Bundler config
 * @param app - VuePress Node App
 * @param chain - Chain function
 */
export const chainWebpack = (
  bundlerOptions: unknown,
  app: App,
  chain: (
    config: WebpackChainConfig,
    isServer: boolean,
    isBuild: boolean,
  ) => void,
): void => {
  if (getBundlerName(app) === 'webpack') {
    const webpackBundlerOptions = bundlerOptions as WebpackBundlerOptions
    const { chainWebpack: originalChainWebpack } = webpackBundlerOptions

    /**
     * Chain webpack config
     *
     * @param config - Webpack chain config
     * @param isServer - Whether it's for server
     * @param isBuild - Whether it's for build
     */
    webpackBundlerOptions.chainWebpack = (config, isServer, isBuild): void => {
      originalChainWebpack?.(config, isServer, isBuild)
      chain(config, isServer, isBuild)
    }
  }
}
