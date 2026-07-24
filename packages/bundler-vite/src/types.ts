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
   * Edit the internal Vite config.
   *
   * @param config - Vite config
   * @param isServer - Whether it is server bundle
   * @param isBuild - Whether in build mode
   * @returns if returns a configuration object, it will be used as the new vite config, otherwise the original config object will be used
   */
  configureVite?: (
    config: InlineConfig,
    isServer: boolean,
    isBuild: boolean,
  ) => InlineConfig | void
}
