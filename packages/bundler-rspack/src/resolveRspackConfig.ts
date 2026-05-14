import type { Configuration } from '@rspack/core'
import type { RspackChain } from 'rspack-chain'
import { merge } from 'rspack-merge'

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
  const rspackConfig = config.toConfig()

  // allow modifying rspack config via `configureRspack`
  const configureRspackResult = options.configureRspack?.(
    rspackConfig,
    isServer,
    isBuild,
  )

  // if `configureRspack` returns a configuration object,
  // use rspack-merge to merge it
  if (configureRspackResult) {
    return merge(rspackConfig, configureRspackResult)
  }

  return rspackConfig
}
