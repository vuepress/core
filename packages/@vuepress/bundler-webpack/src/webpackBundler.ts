import type { Bundler } from '@vuepress/core'
import { createBuild } from './build'
import { createDev } from './dev'
import type { WebpackBundlerOptions } from './types'

export const webpackBundler = (
  options: WebpackBundlerOptions = {}
): Bundler => ({
  name: '@vuepress/bundler-webpack',
  dev: createDev(options),
  build: createBuild(options),
})
