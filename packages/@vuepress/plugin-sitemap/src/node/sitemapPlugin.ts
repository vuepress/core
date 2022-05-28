import type { Plugin } from '@vuepress/core'
import { logger } from '@vuepress/utils'
import { generateSiteMap } from './generateSitemap'
import type { SitemapOptions } from './types'

export const sitemapPlugin = (options: SitemapOptions): Plugin => {
  const plugin: Plugin = {
    name: '@vuepress/plugin-sitemap',
  }

  if (!options.hostname) {
    logger.warn(`[${plugin.name}] 'hostname' is required`)

    return plugin
  }

  return {
    ...plugin,

    async onGenerated(app): Promise<void> {
      await generateSiteMap(app, options as SitemapOptions)
    },
  }
}
