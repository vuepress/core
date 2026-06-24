import type { Options as VuePluginOptions } from '@vitejs/plugin-vue'
import type { BundlerOptions } from '@vuepress/core'
import type { InlineConfig } from 'vite'

/**
 * Options for bundler-vite
 */
export interface ViteBundlerOptions extends BundlerOptions {
  /**
   * Vite options
   */
  viteOptions?: InlineConfig
  /**
   * Options for @vitejs/plugin-vue
   */
  vuePluginOptions?: VuePluginOptions
  /**
   * Modify Vite config
   *
   * @param config - Vite config
   * @param isServer - Whether it is server bundle
   * @param isBuild - Whether in build mode
   * @param mergeConfig - Vite's mergeConfig function, in case you want to use it to merge config
   * @returns New Vite config
   */
  configureVite?: (
    config: InlineConfig,
    isServer: boolean,
    isBuild: boolean,
    mergeConfig: (
      defaultConfig: InlineConfig,
      overrideConfig: InlineConfig,
    ) => InlineConfig,
  ) => InlineConfig | undefined
}
