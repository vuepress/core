import type { App } from '@vuepress/core'
import type { Plugin } from 'vite'
import { constantsReplacementPlugin } from './constantsReplacementPlugin.js'
import { mainPlugin } from './mainPlugin.js'
// import { workaroundPlugin } from './workaroundPlugin.js'

export const vuepressPlugin = ({
  app,
  isBuild,
  isServer,
}: {
  app: App
  isBuild: boolean
  isServer: boolean
}): Plugin[] => [
  constantsReplacementPlugin(app),
  mainPlugin({
    app,
    isBuild,
    isServer,
  }),
  // workaroundPlugin(),
]
