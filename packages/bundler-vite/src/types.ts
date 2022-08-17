import type { Options as VuePluginOptions } from '@vitejs/plugin-vue'
import type { InlineConfig } from 'vite'

/**
 * Options for bundler-vite
 */
export interface ViteBundlerOptions {
  viteOptions?: InlineConfig
  vuePluginOptions?: VuePluginOptions
}
