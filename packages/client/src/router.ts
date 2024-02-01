import { removeEndingSlash } from '@vuepress/shared'
import type { Router } from 'vue-router'
import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
  START_LOCATION,
} from 'vue-router'
import { Vuepress } from './components/Vuepress.js'
import { pagesMap, redirectsMap } from './composables/index.js'
import type { PageData } from './composables/index.js'
import { resolvers } from './resolvers.js'

/**
 * - use `createWebHistory` in dev mode and build mode client bundle
 * - use `createMemoryHistory` in build mode server bundle
 */
const historyCreator = __VUEPRESS_SSR__ ? createMemoryHistory : createWebHistory

/**
 * Create vue-router instance
 */
export const createVueRouter = (): Router => {
  const router = createRouter({
    // it might be an issue of vue-router that have to remove the ending slash
    history: historyCreator(removeEndingSlash(__VUEPRESS_BASE__)),
    routes: [
      {
        name: 'vuepress-route',
        path: '/:catchAll(.*)',
        component: Vuepress,
      },
    ],
    scrollBehavior: (to, _from, savedPosition) => {
      if (savedPosition) return savedPosition
      if (to.hash) return { el: to.hash }
      return { top: 0 }
    },
  })

  // ensure page data and page component have been loaded before resolving the route,
  // and save page data to route meta
  router.beforeResolve(async (to, from): Promise<string | void> => {
    if (to.path !== from.path || from === START_LOCATION) {
      const pagePath = resolvers.resolvePagePath(
        pagesMap.value,
        redirectsMap.value,
        to.path,
      )

      if (pagePath !== to.path) {
        return pagePath
      }

      // get the target page map item or fallback to 404 page
      const pageMapItem =
        pagesMap.value[pagePath] || pagesMap.value['/404.html']!

      // attach page meta to route meta
      to.meta = pageMapItem.meta

      // attach page data to route meta to trigger page data computed when route changes
      const pageChunk = await pageMapItem.loader()
      to.meta._data = await resolvers.resolvePageData(pageChunk.data)
    }
  })

  return router
}

declare module 'vue-router' {
  interface RouteMeta {
    /**
     * Store page data to route meta
     *
     * @internal only for internal use
     */
    _data?: PageData
  }
}
