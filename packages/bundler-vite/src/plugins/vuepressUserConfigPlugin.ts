import type { Plugin } from 'vite'
import type { ViteBundlerOptions } from '../types.js'

/**
 * A plugin to allow user config to override vite config
 */
export const vuepressUserConfigPlugin = (
  options: ViteBundlerOptions,
): Plugin => ({
  name: 'vuepress:user-config',
  config: () => options.viteOptions ?? {},
})
