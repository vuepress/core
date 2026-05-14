import { createRequire } from 'node:module'

import { CssExtractRspackPlugin } from '@rspack/core'
import autoprefixer from 'autoprefixer'
import type { RspackChain } from 'rspack-chain'

import type {
  RspackBundlerOptions,
  StylePreprocessorLoaderOptions,
} from '../types.js'

const require = createRequire(import.meta.url)

/**
 * Set rspack module to handle style files
 */
export const handleModuleStyles = ({
  options,
  config,
  isBuild,
  isServer,
}: {
  options: RspackBundlerOptions
  config: RspackChain
  isBuild: boolean
  isServer: boolean
}): void => {
  const handleStyle = ({
    lang,
    test,
    loaderName,
    loaderOptions,
  }: {
    lang: string
    test: RegExp
    loaderName?: string
    loaderOptions?: StylePreprocessorLoaderOptions
  }): void => {
    // override rspack's native CSS type so CssExtractRspackPlugin + css-loader can process it
    const rule = config.module.rule(lang).test(test).type('javascript/auto')

    if (!isServer) {
      if (isBuild) {
        rule.use('css-extract-loader').loader(CssExtractRspackPlugin.loader)
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

  handleStyle({
    lang: 'scss',
    test: /\.scss$/,
    loaderName: 'sass-loader',
    loaderOptions: options.scss,
  })

  handleStyle({
    lang: 'sass',
    test: /\.sass$/,
    loaderName: 'sass-loader',
    loaderOptions: options.sass,
  })

  handleStyle({
    lang: 'less',
    test: /\.less$/,
    loaderName: 'less-loader',
    loaderOptions: options.less,
  })

  handleStyle({
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
