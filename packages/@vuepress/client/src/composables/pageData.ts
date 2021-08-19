import type { PageData } from '@vuepress/shared'
import { ref, readonly } from 'vue'
import type { Ref } from 'vue'
import { pagesData } from './pagesData'

export type { PageData }

/**
 * Ref wrapper of `PageData`
 */
export type PageDataRef<
  T extends Record<any, any> = Record<never, never>
> = Ref<PageData<T>>

/**
 * Empty page data to be used as the fallback value
 */
const pageDataEmpty = readonly({
  key: '',
  path: '',
  title: '',
  lang: '',
  frontmatter: {},
  excerpt: '',
  headers: [],
} as PageData) as PageData

/**
 * Global page data ref
 */
export const pageData: PageDataRef = ref(pageDataEmpty)

/**
 * Returns the ref of the data of current page
 */
export const usePageData = <
  T extends Record<any, any> = Record<never, never>
>(): PageDataRef<T> => pageData as PageDataRef<T>

/**
 * Resolve page data according to page key
 */
export const resolvePageData = async (pageKey: string): Promise<PageData> => {
  const pageDataResolver = pagesData.value[pageKey]
  if (!pageDataResolver) {
    return pageDataEmpty
  }
  const pageData = await pageDataResolver()
  return pageData ?? pageDataEmpty
}

if (import.meta.webpackHot || import.meta.hot) {
  // reuse vue HMR runtime
  __VUE_HMR_RUNTIME__.updatePageData = (data: PageData) => {
    pagesData.value[data.key] = () => Promise.resolve(data)
    if (data.key === pageData.value.key) {
      pageData.value = data
    }
  }
}
