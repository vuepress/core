import type { App } from '@vuepress/core'
import type { InlineConfig, Plugin } from 'vite'
import { constantsReplacementPlugin } from './constantsReplacementPlugin.js'
import { mainPlugin } from './mainPlugin.js'

export const vuepressPlugin = ({
  app,
  isBuild,
  isServer,
  viteOptions,
}: {
  app: App
  isBuild: boolean
  isServer: boolean
  viteOptions: InlineConfig
}): Plugin[] => [
  constantsReplacementPlugin(app),
  mainPlugin({
    app,
    isBuild,
    isServer,
    viteOptions,
  }),
]
