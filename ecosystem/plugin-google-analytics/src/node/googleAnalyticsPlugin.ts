import type { Plugin, PluginObject } from '@vuepress/core'
import { getDirname, logger, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

/**
 * Options for @vuepress/plugin-google-analytics
 */
export interface GoogleAnalyticsPluginOptions {
  /**
   * The Measurement ID of Google Analytics 4, which should start with `'G-'`.
   */
  id: string
}

export const googleAnalyticsPlugin =
  ({ id }: GoogleAnalyticsPluginOptions): Plugin =>
  (app) => {
    const plugin: PluginObject = {
      name: '@vuepress/plugin-google-analytics',
    }

    if (!id) {
      logger.warn(`[${plugin.name}] 'id' is required`)
      return plugin
    }

    if (app.env.isDev) {
      return plugin
    }

    return {
      ...plugin,

      clientConfigFile: path.resolve(__dirname, '../client/config.js'),

      define: {
        __GA_ID__: id,
      },
    }
  }
