import { inject } from 'vue'
import type { ComputedRef, InjectionKey } from 'vue'
import type { PageData } from './pageData'
import type { SiteLocaleData } from './siteLocaleData'

/**
 * Page head title, which would be used as the content of `head > title` tag
 */
export type PageHeadTitle = string

/**
 * Ref wrapper of `PageHeadTitle`
 */
export type PageHeadTitleRef = ComputedRef<PageHeadTitle>

/**
 * Injection key for page head title
 */
export const pageHeadTitleSymbol: InjectionKey<PageHeadTitleRef> = Symbol(
  __VUEPRESS_DEV__ ? 'pageHeadTitle' : ''
)

/**
 * Returns the ref of the head title of current page
 */
export const usePageHeadTitle = (): PageHeadTitleRef => {
  const pageHeadTitle = inject(pageHeadTitleSymbol)
  if (!pageHeadTitle) {
    throw new Error('usePageHeadTitle() is called without provider.')
  }
  return pageHeadTitle
}

/**
 * Resolve the content of page head title
 *
 * It would be used as the content of the `<title>` tag
 */
export const resolvePageHeadTitle = (
  page: PageData,
  siteLocale: SiteLocaleData
): PageHeadTitle => `${page.title ? `${page.title} | ` : ``}${siteLocale.title}`
