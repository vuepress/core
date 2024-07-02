import type { VuePluginOptions } from '@vuepress/vite-kit'
import type { InlineConfig } from 'vite'

/**
 * Options for bundler-vite
 */
export interface ViteBundlerOptions {
  viteOptions?: InlineConfig
  vuePluginOptions?: VuePluginOptions
}
