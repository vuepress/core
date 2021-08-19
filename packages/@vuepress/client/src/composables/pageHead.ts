import { dedupeHead, isArray, isString } from '@vuepress/shared'
import type { HeadConfig } from '@vuepress/shared'
import { inject } from 'vue'
import type { ComputedRef, InjectionKey } from 'vue'
import type { PageFrontmatter } from './pageFrontmatter'
import type { PageHeadTitle } from './pageHeadTitle'
import type { SiteLocaleData } from './siteLocaleData'

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

/**
 * Merge the head config in frontmatter and site locale
 *
 * Frontmatter should take priority over site locale
 */
export const resolvePageHead = (
  headTitle: PageHeadTitle,
  frontmatter: PageFrontmatter,
  siteLocale: SiteLocaleData
): HeadConfig[] => {
  const description = isString(frontmatter.description)
    ? frontmatter.description
    : siteLocale.description
  const head: HeadConfig[] = [
    ...(isArray(frontmatter.head) ? frontmatter.head : []),
    ...siteLocale.head,
    ['title', {}, headTitle],
    ['meta', { name: 'description', content: description }],
  ]
  return dedupeHead(head)
}
