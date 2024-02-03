import type { PageData } from '@vuepress/shared'
import type { InjectionKey, Ref } from 'vue'
import { inject } from 'vue'

export type { PageData }

/**
 * Ref wrapper of `PageData`
 */
export type PageDataRef<T extends Record<any, any> = Record<never, never>> =
  Ref<PageData<T>>

/**
 * Injection key for page data
 */
export const pageDataSymbol: InjectionKey<PageDataRef> = Symbol(
  __VUEPRESS_DEV__ ? 'pageData' : '',
)

/**
 * Returns the ref of the data of current page
 */
export const usePageData = <
  T extends Record<any, any> = Record<never, never>,
>(): PageDataRef<T> => {
  const pageData = inject(pageDataSymbol)
  if (!pageData) {
    throw new Error('pageData() is called without provider.')
  }
  return pageData as PageDataRef<T>
}
