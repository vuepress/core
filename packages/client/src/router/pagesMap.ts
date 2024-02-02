import {
  pagesMap as pagesMapRaw,
  redirectsMap as redirectsMapRaw,
} from '@internal/pagesMap'
import type {
  PageChunk,
  PageMapItem,
  PageMetaDefault,
  PagesMap,
  RedirectsMap,
} from '@internal/pagesMap'
import { shallowRef } from 'vue'
import type { Ref } from 'vue'

export type { PagesMap, PageMapItem, PageMetaDefault, PageChunk, RedirectsMap }

/**
 * Global pages map ref
 */
export const pagesMap: Ref<PagesMap> = shallowRef(pagesMapRaw)

/**
 * Global pages map ref
 */
export const redirectsMap: Ref<RedirectsMap> = shallowRef(redirectsMapRaw)

if (__VUEPRESS_DEV__ && (import.meta.webpackHot || import.meta.hot)) {
  // reuse vue HMR runtime
  __VUE_HMR_RUNTIME__.updatePagesMap = (data: PagesMap) => {
    pagesMap.value = data
  }
  __VUE_HMR_RUNTIME__.updateRedirectsMap = (data: RedirectsMap) => {
    redirectsMap.value = data
  }
}
