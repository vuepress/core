import type { Plugin } from 'vite'
import type { ViteBundlerOptions } from '../types.js'

/**
 * A plugin to allow user config to override vite config
 */
export const userConfigPlugin = (options: ViteBundlerOptions): Plugin => ({
  name: 'vuepress:user-config',
  config: () => options.viteOptions ?? {},
})
