import type { Bundler } from '@vuepress/core'
import { build } from './build'
import { dev } from './dev'
import type { ViteBundlerOptions } from './types'

export const viteBundler = (options: ViteBundlerOptions = {}): Bundler => ({
  name: '@vuepress/bundler-vite',
  dev: (app) => dev(options, app),
  build: (app) => build(options, app),
})
