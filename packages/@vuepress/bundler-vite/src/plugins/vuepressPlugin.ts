import type { App } from '@vuepress/core'
import type { Plugin } from 'vite'
import { constantsReplacementPlugin } from './constantsReplacementPlugin'
import { mainPlugin } from './mainPlugin'
import { workaroundPlugin } from './workaroundPlugin'

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
  workaroundPlugin(),
]
