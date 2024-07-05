import type { JsPlugin } from '@farmfe/core'
import type { FarmBundlerOptions } from '../types.js'

/**
 * A plugin to allow user config to override vite config
 */
export const vuepressUserConfigPlugin = (
  options: FarmBundlerOptions,
): JsPlugin => ({
  name: 'vuepress:user-config',
  config: () => options.farmOptions ?? {},
})
