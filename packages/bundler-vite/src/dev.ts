import { createRequire } from 'node:module'
import type { App, Bundler } from '@vuepress/core'
import { colors, fs } from '@vuepress/utils'
import { createServer } from 'vite'
import { resolveViteConfig } from './resolveViteConfig.js'
import type { ViteBundlerOptions } from './types.js'

const require = createRequire(import.meta.url)

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

  const viteVersion = fs.readJsonSync(
    require.resolve('vite/package.json')
  ).version
  server.config.logger.info(
    colors.cyan(`\n  vite v${viteVersion}`) +
      colors.green(` dev server running at:\n`),
    {
      clear: !server.config.logger.hasWarned,
    }
  )
  server.printUrls()
  return server.close.bind(server)
}
