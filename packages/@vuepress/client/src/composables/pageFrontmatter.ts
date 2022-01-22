import type { PageFrontmatter } from '@vuepress/shared'
import { inject } from 'vue'
import type { ComputedRef, InjectionKey } from 'vue'

export type { PageFrontmatter }

/**
 * Ref wrapper of `PageFrontmatter`
 */
export type PageFrontmatterRef<
  T extends Record<any, any> = Record<string, unknown>
> = ComputedRef<PageFrontmatter<T>>

/**
 * Injection key for page frontmatter
 */
export const pageFrontmatterSymbol: InjectionKey<PageFrontmatterRef> = Symbol(
  __VUEPRESS_DEV__ ? 'pageFrontmatter' : ''
)

/**
 * Returns the ref of the frontmatter of current page
 */
export const usePageFrontmatter = <
  T extends Record<any, any> = Record<string, unknown>
>(): PageFrontmatterRef<T> => {
  const pageFrontmatter = inject(pageFrontmatterSymbol)
  if (!pageFrontmatter) {
    throw new Error('usePageFrontmatter() is called without provider.')
  }
  return pageFrontmatter as PageFrontmatterRef<T>
}
