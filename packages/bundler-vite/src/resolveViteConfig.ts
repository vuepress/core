import type { App } from '@vuepress/core'
import { vuepressMainPlugin, vuepressVuePlugin } from '@vuepress/vite-kit'
import type { InlineConfig } from 'vite'
import { mergeConfig } from 'vite'
import { vuepressUserConfigPlugin } from './plugins/index.js'
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
        vuepressVuePlugin(options.vuePluginOptions ?? {}),
        vuepressMainPlugin({ app, isBuild, isServer }),
        vuepressUserConfigPlugin(options),
      ],
    },
    // some vite options would not take effect inside a plugin, so we still need to merge them here in addition to userConfigPlugin
    options.viteOptions ?? {},
  )
}
