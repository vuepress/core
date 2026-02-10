import type { SiteLocaleData } from '@vuepress/shared'
import { isEmptyObject } from '@vuepress/shared'
import type { AppOptions, SiteData } from '../types/index.js'

/**
 * Resolve site data for vuepress app
 *
 * Site data will also be used in client
 *
 * @internal
 */
export const resolveAppSiteData = (options: AppOptions): SiteData => {
  const rootLocale: Omit<SiteLocaleData, 'head'> = {
    lang: options.lang,
    title: options.title,
    description: options.description,
  }

  return {
    base: options.base,
    ...rootLocale,
    head: options.head,
    locales: isEmptyObject(options.locales)
      ? { '/': rootLocale }
      : options.locales,
  }
}
