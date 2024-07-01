import type { App } from '@vuepress/core'
import { vuepressMainPlugin, vuepressVuePlugin } from '@vuepress/vite-kit'
import { vuepressUserConfigPlugin } from './plugins/index.js'
import type { FarmBundlerOptions, FarmOptions } from './types.js'

export const resolveFarmConfig = async ({
  app,
  options,
  isBuild,
  isServer,
}: {
  app: App
  options: FarmBundlerOptions
  isBuild: boolean
  isServer: boolean
}): Promise<FarmOptions> => {
  return {
    clearScreen: false,
    ...options.farmOptions,
    plugins: ['@farmfe/plugin-sass', ...(options.farmOptions?.plugins ?? [])],
    vitePlugins: [
      vuepressVuePlugin(options.vuePluginOptions ?? {}),
      vuepressMainPlugin({
        app,
        isBuild,
        isServer,
        alwaysWriteEntryHtml: true,
      }),
      vuepressUserConfigPlugin(options),
      ...(options.farmOptions?.vitePlugins ?? []),
    ],
  }
}
