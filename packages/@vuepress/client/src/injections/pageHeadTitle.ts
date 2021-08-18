import { inject, ref } from 'vue'
import type { ComputedRef, InjectionKey } from 'vue'
import type { PageData } from './pageData'
import type { SiteLocaleData } from './siteLocaleData'

export type PageHeadTitle = string
export type PageHeadTitleRef = ComputedRef<PageHeadTitle>

export const pageHeadTitleSymbol: InjectionKey<PageHeadTitleRef> = Symbol(
  __DEV__ ? 'pageHeadTitle' : ''
)

export const usePageHeadTitle = (): PageHeadTitleRef => {
  const pageHeadTitle = inject(pageHeadTitleSymbol)
  if (!pageHeadTitle) {
    throw new Error('usePageHeadTitle() is called without provider.')
  }
  return pageHeadTitle
}

/**
 * A function used for resolving the content of `head > title` tag
 *
 * This function is stored in a `ref`, so that users could change the
 * function to customize the content of title tag.
 */
export const resolvePageHeadTitle = ref(
  (page: PageData, siteLocale: SiteLocaleData) =>
    `${page.title ? `${page.title} | ` : ``}${siteLocale.title}`
)
