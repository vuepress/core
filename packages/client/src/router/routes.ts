import {
  redirects as redirectsRaw,
  routes as routesRaw,
} from '@internal/routes'
import type { PageData } from '@vuepress/shared'
import { shallowRef } from 'vue'
import type { ComponentOptions, Ref } from 'vue'

export interface PageChunk {
  comp: ComponentOptions
  data: PageData
}

export type PageMetaDefault = Record<string, unknown>

export interface Route<PageMeta extends PageMetaDefault = PageMetaDefault> {
  loader: () => Promise<PageChunk>
  meta: PageMeta
}

export type Redirects = Record<string, string>
export type Routes = Record<string, Route>

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
