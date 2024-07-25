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
 * Common options for some webpack loaders
 */
export interface LoaderOptions {
  sourceMap?: boolean
  webpackImporter?: boolean
  additionalData?:
    | string
    | ((
        content: string,
        loaderContext: LoaderContext<Record<string, any>>,
      ) => string)
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
export interface PostcssLoaderOptions extends Pick<LoaderOptions, 'sourceMap'> {
  execute?: boolean
  postcssOptions?: StylePreprocessorOptions
  implementation?: ((...args: any) => any) | string
}

/**
 * Options for stylus-loader
 *
 * @see https://github.com/webpack-contrib/stylus-loader#options
 */
export interface StylusLoaderOptions extends LoaderOptions {
  stylusOptions?: StylePreprocessorOptions
}

/**
 * Options for sass-loader
 *
 * @see https://github.com/webpack-contrib/sass-loader#options
 */
export interface SassLoaderOptions extends LoaderOptions {
  api?: 'legacy' | 'modern' | 'modern-compiler'
  implementation?: Record<string, any> | string
  sassOptions?: StylePreprocessorOptions
}

/**
 * Options for less-loader
 *
 * @see https://github.com/webpack-contrib/less-loader#options
 */
export interface LessLoaderOptions extends LoaderOptions {
  lessOptions?: StylePreprocessorOptions
}
