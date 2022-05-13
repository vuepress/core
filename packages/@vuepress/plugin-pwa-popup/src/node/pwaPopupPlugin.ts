import type { Plugin, PluginObject } from '@vuepress/core'
import type { LocaleConfig } from '@vuepress/shared'
import { path } from '@vuepress/utils'

/**
 * Options for @vuepress/plugin-pwa-popup
 */
export interface PwaPopupPluginOptions {
  locales?: LocaleConfig<{
    message: string
    buttonText: string
  }>
}

export const pwaPopupPlugin =
  ({ locales = {} }: PwaPopupPluginOptions = {}): Plugin =>
  (app) => {
    const plugin: PluginObject = {
      name: '@vuepress/plugin-pwa-popup',
    }

    if (app.env.isDev) {
      return plugin
    }

    return {
      ...plugin,

      clientConfigFile: path.resolve(__dirname, '../client/config.js'),

      define: {
        __PWA_POPUP_LOCALES__: locales,
      },
    }
  }
