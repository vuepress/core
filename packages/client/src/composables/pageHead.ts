import type { HeadConfig } from '@vuepress/shared'
import { inject } from 'vue'
import type { ComputedRef, InjectionKey } from 'vue'

/**
 * Page head config, which would be used for generate html tags in `<head>`
 */
export type PageHead = HeadConfig[]

/**
 * Ref wrapper of `PageHead`
 */
export type PageHeadRef = ComputedRef<PageHead>

/**
 * Injection key for page head
 */
export const pageHeadSymbol: InjectionKey<PageHeadRef> = Symbol(
  __VUEPRESS_DEV__ ? 'pageHead' : ''
)

/**
 * Returns the ref of the head config of current page
 */
export const usePageHead = (): PageHeadRef => {
  const pageHead = inject(pageHeadSymbol)
  if (!pageHead) {
    throw new Error('usePageHead() is called without provider.')
  }
  return pageHead
}
