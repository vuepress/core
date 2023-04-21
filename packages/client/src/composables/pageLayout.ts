import {
  type Component,
  type ComputedRef,
  inject,
  type InjectionKey,
} from 'vue'

/**
 * Ref wrapper of `PageLayout`
 */
export type PageLayoutRef = ComputedRef<Component>

/**
 * Injection key for page layout
 */
export const pageLayoutSymbol: InjectionKey<PageLayoutRef> = Symbol(
  __VUEPRESS_DEV__ ? 'pageLayout' : ''
)

/**
 * Returns layout component of current page
 */
export const usePageLayout = (): ComputedRef<Component> => {
  const pageLayout = inject(pageLayoutSymbol)
  if (!pageLayout) {
    throw new Error('usePageLayout() is called without provider.')
  }
  return pageLayout
}
