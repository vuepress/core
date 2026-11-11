import type { App } from '@vuepress/core'
import type { RspackChain } from 'rspack-chain'

/**
 * Set rspack devtool
 */
export const handleDevtool = ({
  app,
  config,
  isBuild,
}: {
  app: App
  config: RspackChain
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
