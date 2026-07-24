import type { Configuration } from 'webpack'
import type { Config } from 'webpack-v5-chain'

import type { WebpackBundlerOptions } from './types.js'

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

  // generate webpack config from webpack-v5-chain
  let webpackConfig = config.toConfig()

  // allow modifying webpack config via `configureWebpack`
  const configureWebpackResult = options.configureWebpack?.(
    webpackConfig,
    isServer,
    isBuild,
  )

  // if `configureWebpack` returns a configuration object, use this object as the new webpack config
  if (configureWebpackResult) {
    webpackConfig = configureWebpackResult
  }

  return webpackConfig
}
