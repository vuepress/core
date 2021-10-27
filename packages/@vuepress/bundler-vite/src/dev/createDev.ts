import type { App, Bundler } from '@vuepress/core'
import { chalk } from '@vuepress/utils'
import { createServer, mergeConfig } from 'vite'
import { createPlugin } from '../plugin'
import type { ViteBundlerOptions } from '../types'

export const createDev = (
  options: ViteBundlerOptions
): Bundler['dev'] => async (app: App) => {
  const viteConfig = mergeConfig(
    {
      configFile: false,
      plugins: [
        createPlugin({
          app,
          options,
          isServer: false,
          isBuild: false,
        }),
      ],
      // `clearScreen` won't take effect in `config` hook of plugin API
      clearScreen: false,
    },
    options.viteOptions ?? {}
  )

  const server = await createServer(viteConfig)

  await server.listen()

  server.config.logger.info(
    chalk.cyan(`\n  vite v${require('vite/package.json').version}`) +
      chalk.green(` dev server running at:\n`),
    {
      clear: !server.config.logger.hasWarned,
    }
  )

  server.printUrls()

  // @ts-ignore
  if (global.__vite_start_time) {
    server.config.logger.info(
      chalk.cyan(
        `\n  ready in ${Math.round(
          // @ts-ignore
          performance.now() - global.__vite_start_time
        )}ms.\n`
      )
    )
  }

  return server.close.bind(server)
}
