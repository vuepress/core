import {
  redirects as redirectsRaw,
  routes as routesRaw,
} from '@internal/routes'
import type {
  PageChunk,
  PageMetaDefault,
  Redirects,
  Route,
  Routes,
} from '@internal/routes'
import { shallowRef } from 'vue'
import type { Ref } from 'vue'

export type { PageMetaDefault, PageChunk, Redirects, Route, Routes }

/**
 * Global redirects ref
 */
export const redirects: Ref<Redirects> = shallowRef(redirectsRaw)

/**
 * Global routes ref
 */
export const routes: Ref<Routes> = shallowRef(routesRaw)

if (__VUEPRESS_DEV__ && (import.meta.webpackHot || import.meta.hot)) {
  // reuse vue HMR runtime
  __VUE_HMR_RUNTIME__.updateRoutes = (data: Routes) => {
    routes.value = data
  }
  __VUE_HMR_RUNTIME__.updateRedirects = (data: Redirects) => {
    redirects.value = data
  }
}
