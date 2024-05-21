import type { App } from '@vuepress/core'
import type Config from 'webpack-5-chain'

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
    config.devtool('eval-cheap-module-source-map')
  }
}
