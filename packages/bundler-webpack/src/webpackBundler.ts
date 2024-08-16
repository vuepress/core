import type { Bundler } from '@vuepress/core'
import { build } from './build/index.js'
import { dev } from './dev/index.js'
import type { WebpackBundlerOptions } from './types.js'

export const webpackBundler = (
  options: WebpackBundlerOptions = {},
): Bundler => ({
  name: '@vuepress/bundler-webpack',
  dev: async (app) => dev(options, app),
  build: async (app) => build(options, app),
})
