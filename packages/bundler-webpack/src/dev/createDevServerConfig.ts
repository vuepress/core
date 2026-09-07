import { sep } from 'node:path'

import type { App } from '@vuepress/core'
import { path } from '@vuepress/utils'
import type WebpackDevServer from 'webpack-dev-server'

export const createDevServerConfig = (
  app: App,
): WebpackDevServer.Configuration => ({
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
