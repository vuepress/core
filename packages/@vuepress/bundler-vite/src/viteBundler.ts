import type { Bundler } from '@vuepress/core'
import { createBuild } from './build'
import { createDev } from './dev'
import type { ViteBundlerOptions } from './types'

export const viteBundler = (options: ViteBundlerOptions = {}): Bundler => ({
  name: '@vuepress/bundler-vite',
  dev: createDev(options),
  build: createBuild(options),
})
