import { createRequire } from 'node:module'
import autoprefixer from 'autoprefixer'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import postcssCsso from 'postcss-csso'
import type Config from 'webpack-chain'
import type {
  LessLoaderOptions,
  LoaderOptions,
  SassLoaderOptions,
  StylusLoaderOptions,
  WebpackBundlerOptions,
} from '../types.js'

const require = createRequire(import.meta.url)

type StyleRule = Config.Rule<Config.Rule<Config.Module>>

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
  const createStyleRules = ({
    lang,
    test,
  }: {
    lang: string
    test: RegExp
  }): {
    modulesRule: StyleRule
    normalRule: StyleRule
  } => {
    const baseRule = config.module.rule(lang).test(test)
    const modulesRule = baseRule.oneOf('modules').resourceQuery(/module/)
    const normalRule = baseRule.oneOf('normal')
    return {
      modulesRule,
      normalRule,
    }
  }

  const applyStyleHandlers = ({
    rule,
    cssModules,
    loaderName,
    loaderOptions = {},
  }: {
    rule: StyleRule
    cssModules: boolean
    loaderName?: string
    loaderOptions?: LoaderOptions
  }): void => {
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
        modules: cssModules
          ? {
              localIdentName: `[local]_[contenthash:base64:8]`,
              exportOnlyLocals: isServer,
            }
          : false,
        importLoaders: 1,
      })

    // use postcss-loader
    rule
      .use('postcss-loader')
      .loader(require.resolve('postcss-loader'))
      .options({
        postcssOptions: {
          plugins: [autoprefixer, postcssCsso],
        },
        ...options.postcss,
      })

    // use extra loader
    if (loaderName) {
      rule.use(loaderName).loader(loaderName).options(loaderOptions)
    }
  }

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
    const { modulesRule, normalRule } = createStyleRules({
      lang,
      test,
    })

    applyStyleHandlers({
      rule: modulesRule,
      cssModules: true,
      loaderName,
      loaderOptions,
    })

    applyStyleHandlers({
      rule: normalRule,
      cssModules: false,
      loaderName,
      loaderOptions,
    })
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
