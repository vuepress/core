import type { Bundler } from '@vuepress/core'
import { build } from './build.js'
import { dev } from './dev.js'
import type { FarmBundlerOptions } from './types.js'

export const farmBundler = (options: FarmBundlerOptions = {}): Bundler => ({
  name: '@vuepress/bundler-farm',
  dev: (app) => dev(options, app),
  build: (app) => build(options, app),
})
