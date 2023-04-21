import { default as vuePlugin } from '@vitejs/plugin-vue'
import type { App } from '@vuepress/core'
import { type InlineConfig, mergeConfig } from 'vite'
import {
  constantsReplacementPlugin,
  mainPlugin,
  userConfigPlugin,
} from './plugins/index.js'
import type { ViteBundlerOptions } from './types.js'

export const resolveViteConfig = async ({
  app,
  options,
  isBuild,
  isServer,
}: {
  app: App
  options: ViteBundlerOptions
  isBuild: boolean
  isServer: boolean
}): Promise<InlineConfig> => {
  return mergeConfig(
    {
      clearScreen: false,
      configFile: false,
      logLevel: !isBuild || app.env.isDebug ? 'info' : 'warn',
      esbuild: {
        charset: 'utf8',
      },
      plugins: [
        vuePlugin(options.vuePluginOptions),
        constantsReplacementPlugin(app),
        mainPlugin({ app, isBuild, isServer }),
        userConfigPlugin(options),
      ],
    },
    // some vite options would not take effect inside a plugin, so we still need to merge them here in addition to userConfigPlugin
    options.viteOptions ?? {}
  )
}
