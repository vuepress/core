import type { Configuration } from '@rspack/core'
import type { RspackChain } from 'rspack-chain'

import type { RspackBundlerOptions } from './types.js'

export const resolveRspackConfig = ({
  config,
  options,
  isServer,
  isBuild,
}: {
  config: RspackChain
  options: RspackBundlerOptions
  isServer: boolean
  isBuild: boolean
}): Configuration => {
  // allow modifying rspack config via `chainRspack`
  options.chainRspack?.(config, isServer, isBuild)

  // generate rspack config from rspack-chain
  let rspackConfig = config.toConfig()

  // allow modifying rspack config via `configureRspack`
  const configureRspackResult = options.configureRspack?.(
    rspackConfig,
    isServer,
    isBuild,
  )

  // if `configureRspack` returns a configuration object, use this object as the new rspack config
  if (configureRspackResult) {
    rspackConfig = configureRspackResult
  }

  return rspackConfig
}
