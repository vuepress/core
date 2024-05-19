import { createRequire } from 'node:module'
import autoprefixer from 'autoprefixer'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import type Config from 'webpack-chain'
import type {
  LessLoaderOptions,
  LoaderOptions,
  SassLoaderOptions,
  StylusLoaderOptions,
  WebpackBundlerOptions,
} from '../types.js'

const require = createRequire(import.meta.url)

/**
 * Set webpack module to handle style files
 */
export const handleModuleStyles = ({
  options,
  config,
  isBuild,
  isServer,
}: {
  options: WebpackBundlerOptions
  config: Config
  isBuild: boolean
  isServer: boolean
}): void => {
  const handleStyle = <T extends LoaderOptions = LoaderOptions>({
    lang,
    test,
    loaderName,
    loaderOptions,
  }: {
    lang: string
    test: RegExp
    loaderName?: string
    loaderOptions?: T
  }): void => {
    const rule = config.module.rule(lang).test(test)

    if (!isServer) {
      if (isBuild) {
        rule.use('extract-css-loader').loader(MiniCssExtractPlugin.loader)
      } else {
        rule.use('style-loader').loader(require.resolve('style-loader'))
      }
    }

    // use css-loader
    rule
      .use('css-loader')
      .loader(require.resolve('css-loader'))
      .options({
        modules: {
          auto: true,
          exportLocalsConvention: 'as-is',
          exportOnlyLocals: isServer,
          localIdentName: `[local]_[contenthash:base64:8]`,
          namedExport: false,
        },
        importLoaders: loaderName ? 2 : 1,
      })

    // use postcss-loader
    rule
      .use('postcss-loader')
      .loader(require.resolve('postcss-loader'))
      .options({
        postcssOptions: {
          plugins: [autoprefixer],
        },
        ...options.postcss,
      })

    // use extra loader
    if (loaderName) {
      rule
        .use(loaderName)
        .loader(loaderName)
        .options(loaderOptions ?? {})
    }
  }

  handleStyle({
    lang: 'css',
    test: /\.css$/,
  })

  handleStyle({
    lang: 'postcss',
    test: /\.p(ost)?css$/,
  })

  handleStyle<SassLoaderOptions>({
    lang: 'scss',
    test: /\.scss$/,
    loaderName: 'sass-loader',
    loaderOptions: options.scss,
  })

  handleStyle<SassLoaderOptions>({
    lang: 'sass',
    test: /\.sass$/,
    loaderName: 'sass-loader',
    loaderOptions: options.sass,
  })

  handleStyle<LessLoaderOptions>({
    lang: 'less',
    test: /\.less$/,
    loaderName: 'less-loader',
    loaderOptions: options.less,
  })

  handleStyle<StylusLoaderOptions>({
    lang: 'stylus',
    test: /\.styl(us)?$/,
    loaderName: 'stylus-loader',
    loaderOptions: {
      stylusOptions: {
        // allow literal css import
        includeCSS: true,
        // no need to compress with stylus
        // we will handle it by postcss-loader
        compress: false,
      },
      ...options.stylus,
    },
  })
}
