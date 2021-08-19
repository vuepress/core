import type { App } from '@vuepress/core'
import type * as Config from 'webpack-chain'

/**
 * Set webpack config to handle assets files
 */
export const handleModuleAssets = ({
  app,
  config,
}: {
  app: App
  config: Config
}): void => {
  // images
  config.module
    .rule('images')
    .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
    .type('asset' as any)
    .set('generator', {
      filename: 'assets/img/[name].[contenthash:8][ext]',
    })

  // svg
  // do not base64-inline SVGs.
  // https://github.com/facebookincubator/create-react-app/pull/1180
  config.module
    .rule('svg')
    .test(/\.(svg)(\?.*)?$/)
    .type('asset/resource' as any)
    .set('generator', {
      filename: 'assets/img/[name].[contenthash:8][ext]',
    })

  // media
  config.module
    .rule('media')
    .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
    .type('asset/resource' as any)
    .set('generator', {
      filename: 'assets/media/[name].[contenthash:8][ext]',
    })

  // fonts
  config.module
    .rule('fonts')
    .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
    .type('asset/resource' as any)
    .set('generator', {
      filename: 'assets/fonts/[name].[contenthash:8][ext]',
    })
}
