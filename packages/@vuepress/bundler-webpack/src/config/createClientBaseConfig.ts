import type { App } from '@vuepress/core'
import type * as Config from 'webpack-chain'
import type { WebpackBundlerOptions } from '../types'
import { createBaseConfig } from './createBaseConfig'

export const createClientBaseConfig = async ({
  app,
  options,
  isBuild,
}: {
  app: App
  options: WebpackBundlerOptions
  isBuild: boolean
}): Promise<Config> => {
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
      app.env.isBuild
        ? 'assets/js/[name].[chunkhash:8].js'
        : 'assets/js/[name].js'
    )
    .publicPath(app.options.base)

  return config
}
