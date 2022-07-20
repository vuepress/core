import { createRequire } from 'node:module'
import type { App } from '@vuepress/core'
import type { Configuration } from 'webpack'
import type Config from 'webpack-chain'

const require = createRequire(import.meta.url)

/**
 * Set webpack other options
 *
 * @see https://webpack.js.org/configuration/other-options
 */
export const handleOtherOptions = ({
  app,
  config,
  isBuild,
  isServer,
}: {
  app: App
  config: Config
  isBuild: boolean
  isServer: boolean
}): void => {
  // set infrastructureLogging options
  config.set('infrastructureLogging', {
    level: app.env.isDebug ? 'info' : 'error',
  } as Configuration['infrastructureLogging'])

  // set cache options
  config.set('cache', {
    type: 'filesystem',
    cacheDirectory: app.dir.cache(),
    version: JSON.stringify({
      // vuepress identifiers
      isBuild,
      isServer,
      'version': app.version,
      // dependencies
      'esbuild-loader': require('esbuild-loader/package.json').version,
      'vue-loader': require('vue-loader/package.json').version,
      'webpack': require('webpack/package.json').version,
    }),
  } as Configuration['cache'])
}
