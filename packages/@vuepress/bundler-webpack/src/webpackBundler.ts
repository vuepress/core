import type { Bundler } from '@vuepress/core'
import { build } from './build'
import { dev } from './dev'
import type { WebpackBundlerOptions } from './types'

export const webpackBundler = (
  options: WebpackBundlerOptions = {}
): Bundler => ({
  name: '@vuepress/bundler-webpack',
  dev: (app) => dev(options, app),
  build: (app) => build(options, app),
})
