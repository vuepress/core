import type { Plugin } from 'vite'
import createVuePlugin from '@vitejs/plugin-vue'
import type { App } from '@vuepress/core'
import type { ViteBundlerOptions } from '../types'
import { createVuepressPlugin } from './createVuepressPlugin'
import { createWorkaroundPlugin } from './createWorkaroundPlugin'
import { createConstantReplacementPlugin } from './createConstantReplacementPlugin'

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
  createConstantReplacementPlugin(),
  createVuePlugin(options.vuePluginOptions),
  createWorkaroundPlugin(),
  createVuepressPlugin({
    app,
    options,
    isServer,
    isBuild,
  }),
]
