import type { App } from '@vuepress/core'
import type Config from 'webpack-chain'

/**
 * Set webpack devtool
 */
export const handleDevtool = ({
  app,
  config,
  isBuild,
}: {
  app: App
  config: Config
  isBuild: boolean
}): void => {
  if (app.env.isDebug) {
    // always enable source-map in debug mode
    config.devtool('source-map')
  } else if (!isBuild) {
    // only enable eval-source-map in dev mode
    // TODO: remove type assertion when webpack-chain updates its types for webpack 5
    config.devtool('eval-cheap-module-source-map' as Config.DevTool)
  }
}
