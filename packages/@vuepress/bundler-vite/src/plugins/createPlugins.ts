import createVuePlugin from '@vitejs/plugin-vue'
import type { App } from '@vuepress/core'
import type { Plugin } from 'vite'
import type { ViteBundlerOptions } from '../types'
import { createConstantsReplacementPlugin } from './createConstantsReplacementPlugin'
import { createMainPlugin } from './createMainPlugin'
import { createWorkaroundPlugin } from './createWorkaroundPlugin'

export const createPlugins = ({
  app,
  options,
  isBuild,
  isServer,
}: {
  app: App
  options: ViteBundlerOptions
  isBuild: boolean
  isServer: boolean
}): Plugin[] => [
  // official vue plugin
  createVuePlugin(options.vuePluginOptions),

  // vuepress custom plugin
  createConstantsReplacementPlugin(app),
  createMainPlugin({
    app,
    options,
    isBuild,
    isServer,
  }),
  createWorkaroundPlugin(),
]
