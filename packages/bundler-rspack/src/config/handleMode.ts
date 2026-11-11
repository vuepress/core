import type { App } from '@vuepress/core'
import type { RspackChain } from 'rspack-chain'

/**
 * Set rspack mode
 */
export const handleMode = ({
  app,
  config,
  isBuild,
}: {
  app: App
  config: RspackChain
  isBuild: boolean
}): void => {
  config.mode(!isBuild || app.env.isDebug ? 'development' : 'production')
}
