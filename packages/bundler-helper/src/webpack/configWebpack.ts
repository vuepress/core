import type {
  WebpackBundlerOptions,
  WebpackConfiguration,
} from '@vuepress/bundler-webpack'
import type { App } from '@vuepress/core'

import { getBundlerName } from '../getBundlerName.js'

/**
 * Configure webpack options
 *
 * @param bundlerOptions - VuePress Bundler config
 * @param app - VuePress Node App
 * @param configureWebpack - Function to configure webpack
 */
export const configWebpack = (
  bundlerOptions: unknown,
  app: App,
  configureWebpack: (
    config: WebpackConfiguration,
    isServer: boolean,
    isBuild: boolean,
  ) => void,
): void => {
  if (getBundlerName(app) === 'webpack') {
    const webpackBundlerOptions = bundlerOptions as WebpackBundlerOptions
    const { configureWebpack: originalConfigWebpack } = webpackBundlerOptions

    /**
     * Configure webpack options
     *
     * @param config - Webpack config
     * @param isServer - Whether it's for server
     * @param isBuild - Whether it's for build
     * @returns Updated webpack config
     */
    webpackBundlerOptions.configureWebpack = (
      config,
      isServer,
      isBuild,
    ): WebpackConfiguration | void => {
      const result = originalConfigWebpack?.(config, isServer, isBuild)

      configureWebpack(config, isServer, isBuild)

      return result
    }
  }
}
