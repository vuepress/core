import { createRequire } from 'node:module'
import type { App } from '@vuepress/core'
import type Config from 'webpack-5-chain'

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
  config.infrastructureLogging({
    level: app.env.isDebug ? 'info' : 'error',
  })

  // set cache options
  config.cache({
    type: 'filesystem',
    cacheDirectory: app.dir.cache(),
    version: JSON.stringify({
      // vuepress identifiers
      isBuild,
      isServer,
      'version': app.version,
      // dependencies
      'esbuild-loader': (
        require('esbuild-loader/package.json') as { version: string }
      ).version,
      'vue-loader': (require('vue-loader/package.json') as { version: string })
        .version,
      'webpack': (require('webpack/package.json') as { version: string })
        .version,
    }),
  })
}
