import { pagesComponents } from '@internal/pagesComponents'
import { pagesRoutes } from '@internal/pagesRoutes'
import { removeEndingSlash } from '@vuepress/shared'
import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
  START_LOCATION,
} from 'vue-router'
import type { Router } from 'vue-router'
import { pageData, siteData } from './composables'
import { resolvers } from './resolvers'

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
    // TODO: it might be an issue of vue-router that have to remove the ending slash
    history: historyCreator(removeEndingSlash(siteData.value.base)),
    routes: pagesRoutes,
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) return savedPosition
      if (to.hash) return { el: to.hash }
      return { top: 0 }
    },
  })

  router.beforeResolve(async (to, from) => {
    if (to.path !== from.path || from === START_LOCATION) {
      // ensure page data and page component have been loaded
      ;[pageData.value] = await Promise.all([
        resolvers.resolvePageData(to.name as string),
        pagesComponents[to.name as string]?.__asyncLoader(),
      ])
    }
  })

  return router
}
