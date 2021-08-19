import { sep } from 'path'
import { App } from '@vuepress/core'
import { path } from '@vuepress/utils'
import type { WebpackOptionsNormalized } from 'webpack'
import type { WebpackBundlerOptions } from '../types'
import type { WebpackDevServer } from '../types.webpack-dev-server'
import { resolvePort } from './resolvePort'
import { trailingSlashMiddleware } from './trailingSlashMiddleware'

export const createDevServerConfig = async (
  app: App,
  options: WebpackBundlerOptions
): Promise<Required<WebpackOptionsNormalized>['devServer']> => ({
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
  onAfterSetupMiddleware: (server: WebpackDevServer) => {
    options.afterDevServer?.(server)
  },
  onBeforeSetupMiddleware: (server: WebpackDevServer) => {
    // use trailing slash middleware to support vuepress routing in dev-server
    // it will be handled by most of the deployment platforms
    server.app.use(trailingSlashMiddleware)

    options.beforeDevServer?.(server)
  },
  open: app.options.open,
  port: await resolvePort(app.options.port),
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
