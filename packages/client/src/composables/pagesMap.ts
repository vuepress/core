import {
  pagesMap as pagesMapRaw,
  redirectsMap as redirectsMapRaw,
} from '@internal/pagesMap'
import type { PagesMap, RedirectsMap } from '@internal/pagesMap'
import { shallowRef } from 'vue'
import type { Ref } from 'vue'

/**
 * Ref wrapper of `PagesMap`
 */
export type PagesMapRef = Ref<PagesMap>

/**
 * Ref wrapper of `PageRedirectMap`
 */
export type RedirectsRef = Ref<RedirectsMap>

/**
 * Global pages map ref
 */
export const pagesMap: PagesMapRef = shallowRef(pagesMapRaw)

/**
 * Global pages map ref
 */
export const redirectsMap: RedirectsRef = shallowRef(redirectsMapRaw)

/**
 * Returns the ref of pages map
 */
export const usePagesMap = (): PagesMapRef => pagesMap

/**
 * Returns the ref of pages map
 */
export const useRedirectsMap = (): RedirectsRef => redirectsMap

if (__VUEPRESS_DEV__ && (import.meta.webpackHot || import.meta.hot)) {
  // reuse vue HMR runtime
  __VUE_HMR_RUNTIME__.updatePagesMap = (data: PagesMap) => {
    pagesMap.value = data
  }
  __VUE_HMR_RUNTIME__.updateRedirectsMap = (data: RedirectsMap) => {
    redirectsMap.value = data
  }
}
