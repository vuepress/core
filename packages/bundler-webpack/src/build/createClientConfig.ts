import { createRequire } from 'node:module'
import type { App } from '@vuepress/core'
import { fs } from '@vuepress/utils'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import type {
  BasicMinimizerImplementation,
  CssNanoOptionsExtended,
} from 'css-minimizer-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import type Config from 'webpack-5-chain'
import { createClientBaseConfig } from '../config/index.js'
import type { WebpackBundlerOptions } from '../types.js'
import { createClientPlugin } from './ssr/index.js'

const require = createRequire(import.meta.url)

/**
 * Filename of the client manifest file that generated by client plugin
 */
export const clientManifestFilename = '.server/client-manifest.json'

export const createClientConfig = async (
  app: App,
  options: WebpackBundlerOptions,
): Promise<Config> => {
  const config = await createClientBaseConfig({
    app,
    options,
    isBuild: true,
  })

  // use internal vuepress-loader to handle SSR dependencies
  config.module
    .rule('vue')
    .test(/\.vue$/)
    .use('vuepress-loader')
    .before('vue-loader')
    .loader(require.resolve('#vuepress-loader'))
    .end()

  // vuepress client plugin, handle client assets info for ssr
  config
    .plugin('vuepress-client')
    .use(createClientPlugin(app.dir.temp(clientManifestFilename)))

  // copy files from public dir to dest dir
  if (fs.pathExistsSync(app.dir.public())) {
    config.plugin('copy').use(CopyWebpackPlugin, [
      {
        patterns: [{ from: app.dir.public(), to: app.dir.dest() }],
      },
    ])
  }

  // optimizations for production mode
  // extract-css
  config.plugin('extract-css').use(MiniCssExtractPlugin, [
    {
      filename: 'assets/css/styles.[chunkhash:8].css',
    },
  ])

  config.optimization.splitChunks({
    cacheGroups: {
      // ensure all css are extracted together.
      // since most of the CSS will be from the theme and very little
      // CSS will be from async chunks
      styles: {
        idHint: 'styles',
        // necessary to ensure async chunks are also extracted
        test: (m) => /css\/mini-extract/.test(m.type),
        chunks: 'all',
        enforce: true,
        reuseExistingChunk: true,
      },
      // extract external library to a standalone chunk
      vendor: {
        idHint: 'vendor',
        test: /node_modules/,
        chunks: 'all',
        priority: -10,
        reuseExistingChunk: true,
      },
    },
  })

  // enable runtimeChunk
  config.optimization.runtimeChunk(true)

  // minimize
  config.optimization.minimize(true)

  // minimizer
  config.optimization.minimizer('css').use(CssMinimizerPlugin, [
    {
      minify:
        CssMinimizerPlugin.lightningCssMinify as BasicMinimizerImplementation<CssNanoOptionsExtended>,
    },
  ])

  // disable performance hints
  if (!app.env.isDebug) {
    config.performance.hints(false)
  }

  return config
}
