import type { Plugin } from 'vite'
import createVuePlugin from '@vitejs/plugin-vue'
import type { App } from '@vuepress/core'
import type { ViteBundlerOptions } from '../types'
import { createConstantsReplacementPlugin } from './createConstantsReplacementPlugin'
import { createVuepressPlugin } from './createVuepressPlugin'
import { createWorkaroundPlugin } from './createWorkaroundPlugin'

export const createPlugin = ({
  app,
  options,
  isServer,
  isBuild,
}: {
  app: App
  options: ViteBundlerOptions
  isServer: boolean
  isBuild: boolean
}): Plugin[] => [
  createConstantsReplacementPlugin(app),
  createVuePlugin(options.vuePluginOptions),
  createVuepressPlugin({
    app,
    options,
    isServer,
    isBuild,
  }),
  createWorkaroundPlugin(),
]
