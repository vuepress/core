import type { Configuration } from 'webpack'
import type * as Config from 'webpack-chain'
import { merge } from 'webpack-merge'
import type { WebpackBundlerOptions } from '../types'

export const resolveWebpackConfig = ({
  config,
  options,
  isServer,
  isBuild,
}: {
  config: Config
  options: WebpackBundlerOptions
  isServer: boolean
  isBuild: boolean
}): Configuration => {
  // allow modifying webpack config via `chainWebpack`
  options.chainWebpack?.(config, isServer, isBuild)

  // generate webpack config from webpack-chain
  const webpackConfig = config.toConfig()

  // allow modifying webpack config via `configureWebpack`
  const configureWebpackResult = options.configureWebpack?.(
    webpackConfig,
    isServer,
    isBuild
  )

  // if `configureWebpack` returns a configuration object,
  // use webpack-merge to merge it
  if (configureWebpackResult) {
    return merge(webpackConfig, configureWebpackResult)
  }

  return webpackConfig
}
