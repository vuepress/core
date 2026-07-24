import type { App } from '@vuepress/core'
import type { InlineConfig } from 'vite'
import { mergeConfig } from 'vite'

import {
  vuepressBuildPlugin,
  vuepressConfigPlugin,
  vuepressDevPlugin,
  vuepressMarkdownPlugin,
  vuepressUserConfigPlugin,
  vuepressVuePlugin,
} from './plugins/index.js'
import type { ViteBundlerOptions } from './types.js'

export const resolveViteConfig = ({
  app,
  options,
  isBuild,
  isServer,
}: {
  app: App
  options: ViteBundlerOptions
  isBuild: boolean
  isServer: boolean
}): InlineConfig => {
  // generate base vite config
  let viteConfig = mergeConfig(
    {
      clearScreen: false,
      configFile: false,
      logLevel: !isBuild || app.env.isDebug ? 'info' : 'warn',
      esbuild: {
        charset: 'utf8',
      },
      plugins: [
        vuepressConfigPlugin({ app, isBuild, isServer }),
        vuepressMarkdownPlugin({ app }),
        vuepressDevPlugin({ app }),
        vuepressBuildPlugin({ isServer }),
        vuepressVuePlugin({ options }),
        vuepressUserConfigPlugin({ options }),
      ],
    },
    // some vite options would not take effect inside a plugin, so we still need to merge them here in addition to userConfigPlugin
    options.viteOptions ?? {},
  )

  // allow modifying vite config via `configureVite`
  const configureViteResult = options.configureVite?.(
    viteConfig,
    isServer,
    isBuild,
  )

  // if `configureVite` returns a configuration object, use it as the new vite config
  if (configureViteResult) {
    viteConfig = configureViteResult
  }

  return viteConfig
}
