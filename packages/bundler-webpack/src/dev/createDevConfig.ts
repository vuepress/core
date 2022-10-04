import type { App } from '@vuepress/core'
import HtmlPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import type Config from 'webpack-chain'
import { createClientBaseConfig } from '../config/index.js'
import type { WebpackBundlerOptions } from '../types.js'

export const createDevConfig = async (
  app: App,
  options: WebpackBundlerOptions
): Promise<Config> => {
  const config = await createClientBaseConfig({
    app,
    options,
    isBuild: false,
  })

  config.plugin('html').use(HtmlPlugin, [
    typeof app.options.templateDev === 'function'
      ? { templateContent: app.options.templateDev(app) }
      : {
          template: app.options.templateDev,
        },
  ])

  config.plugin('hmr').use(webpack.HotModuleReplacementPlugin)

  return config
}
