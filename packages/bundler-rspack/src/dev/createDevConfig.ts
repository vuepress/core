import { HotModuleReplacementPlugin } from '@rspack/core'
import type { App } from '@vuepress/core'
import HtmlPlugin from 'html-webpack-plugin'
import type { RspackChain } from 'rspack-chain'

import { createClientBaseConfig } from '../config/index.js'
import type { RspackBundlerOptions } from '../types.js'

export const createDevConfig = async (
  app: App,
  options: RspackBundlerOptions,
): Promise<RspackChain> => {
  const config = await createClientBaseConfig({
    app,
    options,
    isBuild: false,
  })

  config.plugin('html').use(HtmlPlugin, [
    {
      template: app.options.templateDev,
    },
  ])

  config.plugin('hmr').use(HotModuleReplacementPlugin)

  return config
}
