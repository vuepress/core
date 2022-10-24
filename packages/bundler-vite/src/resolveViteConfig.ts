import { default as vuePlugin } from '@vitejs/plugin-vue'
import type { App } from '@vuepress/core'
import type { InlineConfig } from 'vite'
import { vuepressPlugin } from './plugins/index.js'
import type { ViteBundlerOptions } from './types.js'

export const resolveViteConfig = async ({
  app,
  options,
  isBuild,
  isServer,
}: {
  app: App
  options: ViteBundlerOptions
  isBuild: boolean
  isServer: boolean
}): Promise<InlineConfig> => {
  return {
    clearScreen: false,
    configFile: false,
    logLevel: !isBuild || app.env.isDebug ? 'info' : 'warn',
    esbuild: {
      charset: 'utf8',
    },
    plugins: [
      vuePlugin(options.vuePluginOptions),
      vuepressPlugin({ app, isBuild, isServer }),
      { config: () => options.viteOptions ?? {} },
    ],
  }
}
