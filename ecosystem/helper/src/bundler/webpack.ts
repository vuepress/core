import type {
  WebpackBundlerOptions,
  WebpackChainConfig,
} from '@vuepress/bundler-webpack'
import type { App } from '@vuepress/core'
import { getBundlerName } from './getBundler.js'

export interface WebpackCommonOptions {
  /**
   * VuePress Node App
   */
  app: App
  /**
   * VuePress Bundler config
   */
  config: unknown
}

export const chainWebpack = (
  { app, config }: WebpackCommonOptions,
  chainWebpack: (
    config: WebpackChainConfig,
    isServer: boolean,
    isBuild: boolean
  ) => void
): void => {
  if (getBundlerName(app) === 'webpack') {
    const bundlerConfig = <WebpackBundlerOptions>config
    const { chainWebpack: originalChainWebpack } = bundlerConfig

    bundlerConfig.chainWebpack = (config, isServer, isBuild): void => {
      originalChainWebpack?.(config, isServer, isBuild)
      chainWebpack(config, isServer, isBuild)
    }
  }
}
