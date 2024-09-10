import vuePlugin from '@vitejs/plugin-vue'
import type { Plugin } from 'vite'
import type { ViteBundlerOptions } from '../types.js'

/**
 * Wrapper of the official vue plugin
 */
export const vuepressVuePlugin = ({
  options,
}: {
  options: ViteBundlerOptions
}): Plugin =>
  vuePlugin({
    ...options.vuePluginOptions,
  })
