import type { AppOptions, SiteData } from '../types'

/**
 * Resolve site data for vuepress app
 *
 * Site data will also be used in client
 */
export const resolveAppSiteData = (options: AppOptions): SiteData => ({
  base: options.base,
  lang: options.lang,
  title: options.title,
  description: options.description,
  head: options.head,
  locales: options.locales,
})
