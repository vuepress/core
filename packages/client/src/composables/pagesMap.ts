import {
  pagesMap as pagesMapRaw,
  redirectsMap as redirectsMapRaw,
} from '@internal/pagesMap'
import type { PageRedirectsMap, PagesMap } from '@internal/pagesMap'
import { ref } from 'vue'
import type { Ref } from 'vue'

/**
 * Ref wrapper of `PagesMap`
 */
export type PagesMapRef = Ref<PagesMap>

/**
 * Ref wrapper of `PageRedirectMap`
 */
export type PageRedirectsRef = Ref<PageRedirectsMap>

/**
 * Global pages map ref
 */
export const pagesMap: PagesMapRef = ref(pagesMapRaw)

/**
 * Global pages map ref
 */
export const redirectsMap: PageRedirectsRef = ref(redirectsMapRaw)

/**
 * Returns the ref of pages map
 */
export const usePagesMap = (): PagesMapRef => pagesMap

/**
 * Returns the ref of pages map
 */
export const useRedirectsMap = (): PageRedirectsRef => redirectsMap

if (__VUEPRESS_DEV__ && (import.meta.webpackHot || import.meta.hot)) {
  // reuse vue HMR runtime
  __VUE_HMR_RUNTIME__.updatePageRedirectsMap = (data: PageRedirectsMap) => {
    redirectsMap.value = data
  }
  __VUE_HMR_RUNTIME__.updatePagesMap = (data: PagesMap) => {
    pagesMap.value = data
  }
}
