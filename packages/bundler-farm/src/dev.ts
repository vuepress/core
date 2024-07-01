import { Compiler, DEFAULT_HMR_OPTIONS, logger, Server } from '@farmfe/core'
import type { App, Bundler } from '@vuepress/core'
import { resolveFarmConfig } from './resolveFarmConfig.js'
import type { FarmBundlerOptions } from './types.js'
export const dev = async (
  options: FarmBundlerOptions,
  app: App,
): ReturnType<Bundler['dev']> => {
  // plugin hook: extendsBundlerOptions
  await app.pluginApi.hooks.extendsBundlerOptions.process(options, app)

  const farmConfig = await resolveFarmConfig({
    app,
    options,
    isBuild: false,
    isServer: false,
  })

  const compiler = new Compiler({
    config: farmConfig.compilation,
    jsPlugins: [],
    rustPlugins: [],
  })
  const server = new Server({ compiler, logger })
  // @ts-expect-error wrong types? todo
  await server.createDevServer({
    ...farmConfig.server,
    hmr: DEFAULT_HMR_OPTIONS,
  })
  await server.listen()

  return server.close.bind(server)
}
