import { default as vuePlugin } from '@vitejs/plugin-vue'
import type { App } from '@vuepress/core'
import { mergeConfig } from 'vite'
import type { InlineConfig } from 'vite'
import { vuepressPlugin } from './plugins/index.js'
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
}): Promise<InlineConfig> =>
  mergeConfig(
    {
      clearScreen: false,
      configFile: false,
      logLevel: !isBuild || app.env.isDebug ? 'info' : 'warn',
      plugins: [
        vuePlugin(options.vuePluginOptions),
        vuepressPlugin({ app, isBuild, isServer }),
      ],
    },
    options.viteOptions ?? {}
  )
