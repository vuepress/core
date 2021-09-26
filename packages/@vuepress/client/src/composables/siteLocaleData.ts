import type { SiteData } from '@vuepress/shared'
import { inject } from 'vue'
import type { ComputedRef, InjectionKey } from 'vue'
import type { RouteLocale } from './routeLocale'

/**
 * Site data of current locale
 */
export type SiteLocaleData = SiteData

/**
 * Ref wrapper of `SiteLocaleData`
 */
export type SiteLocaleDataRef = ComputedRef<SiteLocaleData>

/**
 * Injection key for site locale data
 */
export const siteLocaleDataSymbol: InjectionKey<SiteLocaleDataRef> = Symbol(
  __VUEPRESS_DEV__ ? 'siteLocaleData' : ''
)

/**
 * Returns the ref of the site data of current locale
 */
export const useSiteLocaleData = (): SiteLocaleDataRef => {
  const siteLocaleData = inject(siteLocaleDataSymbol)
  if (!siteLocaleData) {
    throw new Error('useSiteLocaleData() is called without provider.')
  }
  return siteLocaleData
}

/**
 * Resolve site data for specific locale
 *
 * It would merge the locales fields to the root fields
 */
export const resolveSiteLocaleData = (
  site: SiteData,
  routeLocale: RouteLocale
): SiteLocaleData => ({
  ...site,
  ...site.locales[routeLocale],
})
