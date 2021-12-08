import type { App, BundlerDev } from '@vuepress/core'
import { chalk, logger, ora } from '@vuepress/utils'
import * as webpack from 'webpack'
import * as WebpackDevServer from 'webpack-dev-server'
import type { WebpackBundlerOptions } from '../types'
import { resolveWebpackConfig } from '../utils'
import { createDevConfig } from './createDevConfig'
import { createDevServerConfig } from './createDevServerConfig'

/**
 * Create the dev method of webpack bundler
 */
export const createDev =
  (options: WebpackBundlerOptions): BundlerDev =>
  async (app: App) => {
    // create webpack config
    const config = await createDevConfig(app, options)
    const webpackConfig = resolveWebpackConfig({
      config,
      options,
      isServer: false,
      isBuild: false,
    })

    // create webpack compiler
    const compiler = webpack(webpackConfig)

    // create webpack-dev-server
    const serverConfig = await createDevServerConfig(app, options)
    const server = new WebpackDevServer(serverConfig, compiler)

    const [, close] = await Promise.all([
      // wait for webpack-dev-server to start
      server.start(),

      // wait for webpack compilation to complete
      new Promise<() => Promise<void>>((resolve, reject) => {
        // create spinner
        const spinner = ora()
        let hasStarted = false
        let hasFinished = false

        // start spinner before the first compilation
        compiler.hooks.beforeCompile.tap('vuepress-dev', () => {
          if (hasStarted) return
          hasStarted = true

          spinner.start('Compiling with webpack...')
        })

        // stop spinner, show compilation time and print url after first compilation
        compiler.hooks.done.tap('vuepress-dev', ({ endTime, startTime }) => {
          if (hasFinished) return
          hasFinished = true

          spinner.succeed(`Compilation finished in ${endTime! - startTime!}ms`)

          // replace `0.0.0.0` with `localhost` as `0.0.0.0` is not available on windows
          const url = `http://${
            serverConfig.host === '0.0.0.0' ? 'localhost' : serverConfig.host
          }:${serverConfig.port}${app.options.base}`
          logger.success(
            `VuePress webpack dev server is listening at ${chalk.cyan(url)}`
          )

          // resolve the close function
          resolve((): Promise<void> => server.stop())
        })

        // stop spinner and reject error if the first compilation is failed
        compiler.hooks.failed.tap('vuepress-dev', (err) => {
          if (hasFinished) return
          hasFinished = true

          spinner.fail('Compilation failed')
          reject(err)
        })
      }),
    ])

    // return the close function
    return close
  }
