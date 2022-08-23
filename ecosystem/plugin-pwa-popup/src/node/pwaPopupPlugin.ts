import type { Plugin, PluginObject } from '@vuepress/core'
import type { LocaleConfig } from '@vuepress/shared'
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

/**
 * Options for @vuepress/plugin-pwa-popup
 */
export interface PwaPopupPluginOptions {
  /**
   * Locales config for PWA popup
   */
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

      alias: {
        // workaround for https://github.com/vitejs/vite/issues/7621
        '@vuepress/plugin-pwa-popup/client': path.resolve(
          __dirname,
          '../client/index.js'
        ),
      },

      define: {
        __PWA_POPUP_LOCALES__: locales,
      },
    }
  }
