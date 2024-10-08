import type { App } from '@vuepress/core'
import type { InlineConfig } from 'vite'
import { mergeConfig } from 'vite'
import {
  vuepressBuildPlugin,
  vuepressConfigPlugin,
  vuepressDevPlugin,
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
}): InlineConfig =>
  mergeConfig(
    {
      clearScreen: false,
      configFile: false,
      logLevel: !isBuild || app.env.isDebug ? 'info' : 'warn',
      esbuild: {
        charset: 'utf8',
      },
      plugins: [
        vuepressConfigPlugin({ app, isBuild, isServer }),
        vuepressDevPlugin({ app }),
        vuepressBuildPlugin({ isServer }),
        vuepressVuePlugin({ options }),
        vuepressUserConfigPlugin({ options }),
      ],
    },
    // some vite options would not take effect inside a plugin, so we still need to merge them here in addition to userConfigPlugin
    options.viteOptions ?? {},
  )
