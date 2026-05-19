import type {
  LoaderContext,
  Configuration as RspackConfiguration,
} from '@rspack/core'
import type {
  RspackDevServer,
  Configuration as RspackDevServerConfiguration,
} from '@rspack/dev-server'
import type { BundlerOptions } from '@vuepress/core'
import type { RspackChain } from 'rspack-chain'
import type { VueLoaderOptions } from 'vue-loader'

export type { VueLoaderOptions, RspackConfiguration, RspackDevServer }

/**
 * Options for bundler-rspack
 */
export interface RspackBundlerOptions extends BundlerOptions {
  /**
   * use rspack-merge to set rspack config
   */
  configureRspack?: (
    config: RspackConfiguration,
    isServer: boolean,
    isBuild: boolean,
  ) => RspackConfiguration | void

  /**
   * use rspack-chain to set rspack config
   */
  chainRspack?: (
    config: RspackChain,
    isServer: boolean,
    isBuild: boolean,
  ) => void

  /**
   * `setupMiddlewares` config of rspack-dev-server
   */
  devServerSetupMiddlewares?: RspackDevServerConfiguration['setupMiddlewares']

  /**
   * vue-loader options
   */
  vue?: VueLoaderOptions

  /**
   * postcss-loader options
   */
  postcss?: PostcssLoaderOptions

  /**
   * stylus-loader options
   */
  stylus?: StylusLoaderOptions

  /**
   * sass-loader options for scss files
   */
  scss?: SassLoaderOptions

  /**
   * sass-loader options for sass files
   */
  sass?: SassLoaderOptions

  /**
   * less-loader options
   */
  less?: LessLoaderOptions

  /**
   * only target evergreen browsers or not
   */
  evergreen?: boolean
}

/**
 * Common options for style preprocessor rspack loaders
 */
export interface StylePreprocessorLoaderOptions {
  additionalData?:
    | string
    | ((
        content: string,
        loaderContext: LoaderContext<Record<string, unknown>>,
      ) => string)
  sourceMap?: boolean
}

/**
 * Common type for style pre-processor options
 */
export type StylePreprocessorOptions<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T | ((loaderContext: LoaderContext<T>) => TextDecodeOptions)

/**
 * Options for postcss-loader
 *
 * @see https://github.com/webpack-contrib/postcss-loader#options
 */
export interface PostcssLoaderOptions extends Pick<
  StylePreprocessorLoaderOptions,
  'sourceMap'
> {
  execute?: boolean
  implementation?: string | ((...args: unknown[]) => unknown)
  postcssOptions?: StylePreprocessorOptions
}

/**
 * Options for stylus-loader
 *
 * @see https://github.com/webpack-contrib/stylus-loader#options
 */
export interface StylusLoaderOptions extends StylePreprocessorLoaderOptions {
  implementation?: string | ((...args: unknown[]) => unknown)
  stylusOptions?: StylePreprocessorOptions
}

/**
 * Options for sass-loader
 *
 * @see https://github.com/webpack-contrib/sass-loader#options
 */
export interface SassLoaderOptions extends StylePreprocessorLoaderOptions {
  api?: 'legacy' | 'modern-compiler' | 'modern'
  implementation?: Record<string, unknown> | string
  sassOptions?: StylePreprocessorOptions
  warnRuleAsWarning?: boolean
}

/**
 * Options for less-loader
 *
 * @see https://github.com/webpack-contrib/less-loader#options
 */
export interface LessLoaderOptions extends StylePreprocessorLoaderOptions {
  implementation?: Record<string, unknown> | string
  lessLogAsWarnOrErr?: boolean
  lessOptions?: StylePreprocessorOptions
}
