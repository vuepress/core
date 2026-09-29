import type { App } from '@vuepress/core'
import type { RspackChain } from 'rspack-chain'

import type { RspackBundlerOptions } from '../types.js'
import { createBaseConfig } from './createBaseConfig.js'

export const createClientBaseConfig = async ({
  app,
  options,
  isBuild,
}: {
  app: App
  options: RspackBundlerOptions
  isBuild: boolean
}): Promise<RspackChain> => {
  const config = await createBaseConfig({
    app,
    options,
    isServer: false,
    isBuild,
  })

  // client output
  config.output
    .path(app.dir.dest())
    .filename(
      isBuild ? 'assets/js/[name].[chunkhash:8].js' : 'assets/js/[name].js',
    )
    .publicPath(app.options.base)

  return config
}
