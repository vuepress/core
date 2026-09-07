import type { Bundler } from '@vuepress/core'
import { mergeConfig } from 'vite'

import { build } from './build/index.js'
import { dev } from './dev.js'
import type { ViteBundlerOptions } from './types.js'

export const viteBundler = (options: ViteBundlerOptions = {}): Bundler => ({
  name: '@vuepress/bundler-vite',
  type: 'vite',
  dev: async (app) => dev(options, app),
  build: async (app) => build(options, app),
  mergeConfig: mergeConfig as Bundler['mergeConfig'],
})
