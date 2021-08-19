import type { PageData } from '@vuepress/shared'
import { inject } from 'vue'
import type { ComputedRef, InjectionKey } from 'vue'

/**
 * Page language
 */
export type PageLang = string

/**
 * Ref wrapper of `PageLang`
 */
export type PageLangRef = ComputedRef<PageLang>

/**
 * Injection key for page language
 */
export const pageLangSymbol: InjectionKey<PageLangRef> = Symbol(
  __VUEPRESS_DEV__ ? 'pageLang' : ''
)

/**
 * Returns the ref of the language of current page
 */
export const usePageLang = (): PageLangRef => {
  const pageLang = inject(pageLangSymbol)
  if (!pageLang) {
    throw new Error('usePageLang() is called without provider.')
  }
  return pageLang
}

/**
 * Resolve page language from page data
 *
 * It would be used as the `lang` attribute of `<html>` tag
 */
export const resolvePageLang = (pageData: PageData): PageLang =>
  pageData.lang || 'en'
