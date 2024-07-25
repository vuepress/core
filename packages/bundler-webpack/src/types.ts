import type { VueLoaderOptions } from 'vue-loader'
import type {
  LoaderContext,
  Configuration as WebpackConfiguration,
} from 'webpack'
import type WebpackChainConfig from 'webpack-5-chain'
import type WebpackDevServer from 'webpack-dev-server'

export type {
  VueLoaderOptions,
  WebpackConfiguration,
  WebpackChainConfig,
  WebpackDevServer,
}

/**
 * Options for bundler-webpack
 */
export interface WebpackBundlerOptions {
  /**
   * use webpack-merge to set webpack config
   */
  configureWebpack?: (
    config: WebpackConfiguration,
    isServer: boolean,
    isBuild: boolean,
  ) => WebpackConfiguration | void

  /**
   * use webpack-5-chain to set webpack config
   */
  chainWebpack?: (
    config: WebpackChainConfig,
    isServer: boolean,
    isBuild: boolean,
  ) => void

  /**
   * `setupMiddlewares` config of webpack-dev-server
   */
  devServerSetupMiddlewares?: WebpackDevServer.Configuration['setupMiddlewares']

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
 * Common options for style preprocessor webpack loaders
 */
export interface StylePreprocessorLoaderOptions {
  additionalData?:
    | string
    | ((
        content: string,
        loaderContext: LoaderContext<Record<string, any>>,
      ) => string)
  sourceMap?: boolean
  webpackImporter?: boolean
}

/**
 * Common type for style pre-processor options
 */
export type StylePreprocessorOptions<
  T extends Record<string, any> = Record<string, any>,
> = T | ((loaderContext: LoaderContext<T>) => TextDecodeOptions)

/**
 * Options for postcss-loader
 *
 * @see https://github.com/webpack-contrib/postcss-loader#options
 */
export interface PostcssLoaderOptions
  extends Pick<StylePreprocessorLoaderOptions, 'sourceMap'> {
  execute?: boolean
  implementation?: ((...args: any) => any) | string
  postcssOptions?: StylePreprocessorOptions
}

/**
 * Options for stylus-loader
 *
 * @see https://github.com/webpack-contrib/stylus-loader#options
 */
export interface StylusLoaderOptions extends StylePreprocessorLoaderOptions {
  implementation?: ((...args: any) => any) | string
  stylusOptions?: StylePreprocessorOptions
}

/**
 * Options for sass-loader
 *
 * @see https://github.com/webpack-contrib/sass-loader#options
 */
export interface SassLoaderOptions extends StylePreprocessorLoaderOptions {
  api?: 'legacy' | 'modern' | 'modern-compiler'
  implementation?: Record<string, any> | string
  sassOptions?: StylePreprocessorOptions
  warnRuleAsWarning?: boolean
}

/**
 * Options for less-loader
 *
 * @see https://github.com/webpack-contrib/less-loader#options
 */
export interface LessLoaderOptions extends StylePreprocessorLoaderOptions {
  implementation?: Record<string, any> | string
  lessLogAsWarnOrErr?: boolean
  lessOptions?: StylePreprocessorOptions
}
