import type {
  WebpackBundlerOptions,
  WebpackChainConfig,
} from '@vuepress/bundler-webpack'
import type { App } from '@vuepress/core'
import { getBundlerName } from './getBundler.js'

export const addChainWebpack = (
  bundlerOptions: unknown,
  app: App,
  chainWebpack: (
    config: WebpackChainConfig,
    isServer: boolean,
    isBuild: boolean
  ) => void
): void => {
  if (getBundlerName(app) === 'webpack') {
    const webpackBundlerOptions = <WebpackBundlerOptions>bundlerOptions
    const { chainWebpack: originalChainWebpack } = webpackBundlerOptions

    webpackBundlerOptions.chainWebpack = (config, isServer, isBuild): void => {
      originalChainWebpack?.(config, isServer, isBuild)
      chainWebpack(config, isServer, isBuild)
    }
  }
}
