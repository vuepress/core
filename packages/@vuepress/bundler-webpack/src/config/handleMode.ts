import type { App } from '@vuepress/core'
import type * as Config from 'webpack-chain'

/**
 * Set webpack mode
 */
export const handleMode = ({
  app,
  config,
}: {
  app: App
  config: Config
}): void => {
  config.mode(app.env.isBuild ? 'production' : 'development')
}
