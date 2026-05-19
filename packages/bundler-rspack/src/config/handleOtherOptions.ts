import { createRequire } from 'node:module'

import type { App } from '@vuepress/core'
import type { RspackChain } from 'rspack-chain'

const require = createRequire(import.meta.url)

/**
 * Set rspack other options
 *
 * @see https://rspack.rs/config/other-options
 */
export const handleOtherOptions = ({
  app,
  config,
  isBuild,
  isServer,
}: {
  app: App
  config: RspackChain
  isBuild: boolean
  isServer: boolean
}): void => {
  // set infrastructureLogging options
  config.infrastructureLogging({
    level: app.env.isDebug ? 'info' : 'error',
  })

  // set cache options
  config.cache({
    type: 'persistent',
    storage: {
      type: 'filesystem',
      directory: app.dir.cache(),
    },
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
      '@rspack/core': (
        require('@rspack/core/package.json') as { version: string }
      ).version,
    }),
  })
}
