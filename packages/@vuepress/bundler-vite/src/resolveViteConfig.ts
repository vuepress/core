import vuePlugin from '@vitejs/plugin-vue'
import type { App } from '@vuepress/core'
import { mergeConfig } from 'vite'
import type { InlineConfig } from 'vite'
import { vuepressPlugin } from './plugins'
import type { ViteBundlerOptions } from './types'

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
      plugins: [
        vuePlugin(options.vuePluginOptions),
        vuepressPlugin({ app, isBuild, isServer }),
      ],
    },
    options.viteOptions ?? {}
  )
