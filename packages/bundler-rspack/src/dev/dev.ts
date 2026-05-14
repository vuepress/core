import { rspack } from '@rspack/core'
import { RspackDevServer } from '@rspack/dev-server'
import type { App, Bundler } from '@vuepress/core'
import { colors, logger, ora } from '@vuepress/utils'

import { resolveRspackConfig } from '../resolveRspackConfig.js'
import type { RspackBundlerOptions } from '../types.js'
import { createDevConfig } from './createDevConfig.js'
import { createDevServerConfig } from './createDevServerConfig.js'

/**
 * Create the dev method of rspack bundler
 */
export const dev = async (
  options: RspackBundlerOptions,
  app: App,
): ReturnType<Bundler['dev']> => {
  // plugin hook: extendsBundlerOptions
  await app.pluginApi.hooks.extendsBundlerOptions.process(options, app)

  // create rspack config
  const rspackConfig = resolveRspackConfig({
    config: await createDevConfig(app, options),
    options,
    isServer: false,
    isBuild: false,
  })

  // create rspack compiler
  const compiler = rspack(rspackConfig)

  // create rspack-dev-server
  const serverConfig = createDevServerConfig(app, options)
  const server = new RspackDevServer(serverConfig, compiler)

  const [, close] = await Promise.all([
    // wait for rspack-dev-server to start
    server.start(),

    // wait for rspack compilation to complete
    new Promise<() => Promise<void>>((resolve, reject) => {
      // create spinner
      const spinner = ora()
      let hasStarted = false
      let hasFinished = false

      // start spinner before the first compilation
      compiler.hooks.beforeCompile.tap('vuepress-dev', () => {
        if (hasStarted) return
        hasStarted = true

        spinner.start('Compiling with rspack...')
      })

      // stop spinner, show compilation time and print url after first compilation
      compiler.hooks.done.tap('vuepress-dev', ({ endTime, startTime }) => {
        if (hasFinished) return
        hasFinished = true

        spinner.succeed(
          endTime && startTime
            ? `Compilation finished in ${endTime - startTime}ms`
            : 'Compilation finished',
        )

        // replace `0.0.0.0` with `localhost` as `0.0.0.0` is not available on windows
        const url = `http://${
          serverConfig.host === '0.0.0.0' ? 'localhost' : serverConfig.host
        }:${serverConfig.port}${app.options.base}`
        logger.success(
          `VuePress rspack dev server is listening at ${colors.cyan(url)}`,
        )

        // resolve the close function
        resolve(async (): Promise<void> => server.stop())
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
