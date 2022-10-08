import type { Plugin, PluginObject } from '@vuepress/core'
import { logger, path } from '@vuepress/utils'
import type { GoogleAnalyticsPluginOptions } from '../shared/index.js'

export const googleAnalyticsPlugin =
  (options: GoogleAnalyticsPluginOptions): Plugin =>
  (app) => {
    const plugin: PluginObject = {
      name: '@vuepress/plugin-google-analytics',
    }

    if (!options.id) {
      logger.warn(`[${plugin.name}] 'id' is required`)
      return plugin
    }

    // returns an empty plugin in dev mode when debug mode is not enabled
    if (app.env.isDev && !options.debug) {
      return plugin
    }

    return {
      ...plugin,

      clientConfigFile: path.resolve(__dirname, '../client/config.js'),

      define: {
        __GA_OPTIONS__: options,
      },
    }
  }
