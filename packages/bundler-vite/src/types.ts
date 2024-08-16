import type { Options as VuePluginOptions } from '@vitejs/plugin-vue'
import type { BundlerOptions } from '@vuepress/core'
import type { InlineConfig } from 'vite'

/**
 * Options for bundler-vite
 */
export interface ViteBundlerOptions extends BundlerOptions {
  viteOptions?: InlineConfig
  vuePluginOptions?: VuePluginOptions
}
