import type { App, Bundler } from '@vuepress/core'
import { chalk } from '@vuepress/utils'
import { createServer } from 'vite'
import { resolveViteConfig } from './resolveViteConfig'
import type { ViteBundlerOptions } from './types'

export const dev = async (
  options: ViteBundlerOptions,
  app: App
): ReturnType<Bundler['dev']> => {
  // plugin hook: extendsBundlerOptions
  await app.pluginApi.hooks.extendsBundlerOptions.process(options, app)

  const viteConfig = await resolveViteConfig({
    app,
    options,
    isBuild: false,
    isServer: false,
  })

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
  return server.close.bind(server)
}
