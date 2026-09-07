import { sep } from 'node:path'

import type { Configuration, RspackDevServer } from '@rspack/dev-server'
import type { App } from '@vuepress/core'
import { path } from '@vuepress/utils'

import type { RspackBundlerOptions } from '../types.js'
import { trailingSlashMiddleware } from './trailingSlashMiddleware.js'

export const createDevServerConfig = (
  app: App,
  options: RspackBundlerOptions,
): Configuration => ({
  allowedHosts: 'all',
  compress: true,
  devMiddleware: {
    publicPath: app.options.base,
    writeToDisk: false,
    stats: app.env.isDebug ? 'normal' : 'errors-warnings',
  },
  headers: {
    'access-control-allow-origin': '*',
  },
  historyApiFallback: {
    disableDotRule: true,
    rewrites: [{ from: /./, to: path.join(app.options.base, 'index.html') }],
  },
  host: app.options.host,
  hot: true,
  setupMiddlewares: (middlewares, devServer: RspackDevServer) => {
    devServer.app?.use(trailingSlashMiddleware)
    return (
      options.devServerSetupMiddlewares?.(middlewares, devServer) ?? middlewares
    )
  },
  open: app.options.open,
  port: app.options.port,
  static: {
    // `static.directory` will fail on Windows if we do not replace / with \
    directory: app.dir.public().replace('/', sep),
    publicPath: app.options.base,
    watch: {
      ignoreInitial: true,
      ignored: [
        // Do not watch node_modules
        'node_modules',
      ],
    },
  },
})
