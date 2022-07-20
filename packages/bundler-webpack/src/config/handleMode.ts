import type { App } from '@vuepress/core'
import type Config from 'webpack-chain'

/**
 * Set webpack mode
 */
export const handleMode = ({
  app,
  config,
  isBuild,
}: {
  app: App
  config: Config
  isBuild: boolean
}): void => {
  config.mode(!isBuild || app.env.isDebug ? 'development' : 'production')
}
