import type { Plugin, PluginObject } from '@vuepress/core'
import { logger } from '@vuepress/utils'
import { generateSiteMap } from './generateSitemap'
import type { SitemapOptions } from './types'

export const sitemapPlugin =
  (options: SitemapOptions): Plugin =>
  (app) => {
    const plugin: PluginObject = {
      name: '@vuepress/plugin-sitemap',
    }

    if (app.env.isDev) {
      return plugin
    }

    if (!options.hostname) {
      logger.warn(`[${plugin.name}] 'hostname' is required`)
      return plugin
    }

    return {
      ...plugin,

      onGenerated: (app) => generateSiteMap(app, options),
    }
  }
