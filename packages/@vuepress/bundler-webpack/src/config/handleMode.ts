import type { App } from '@vuepress/core'
import type * as Config from 'webpack-chain'

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
  config.mode(isBuild ? 'production' : 'development')
}
