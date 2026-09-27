import { removeEndingSlash } from '@vuepress/shared'
import type { Router } from 'vue-router'
import {
  START_LOCATION,
  createMemoryHistory,
  createRouter,
  createWebHistory,
} from 'vue-router'

import type { PageChunk } from '../types/index.js'
import { resolveRoute } from './resolveRoute.js'

/**
 * - use `createWebHistory` in dev mode and build mode client bundle
 * - use `createMemoryHistory` in build mode server bundle
 */
const historyCreator = __VUEPRESS_SSR__ ? createMemoryHistory : createWebHistory

/**
 * Create router instance
 */
export const createVueRouter = (): Router => {
  const router = createRouter({
    // it might be an issue of vue-router that have to remove the ending slash
    history: historyCreator(removeEndingSlash(__VUEPRESS_BASE__)),
    routes: [
      {
        name: 'vuepress-route',
        path: '/:catchAll(.*)',
        components: {},
      },
    ],
    scrollBehavior: (to, _from, savedPosition) => {
      if (savedPosition) return savedPosition
      if (to.hash) {
        const id = decodeURIComponent(to.hash).slice(1)

        // scroll with `scrollIntoView` instead of letting vue-router resolve
        // the element, so that `scroll-margin-top` is honored. Themes rely on
        // it to keep anchor targets clear of a fixed navbar.
        //
        // It is also deferred to the next frame, because the target element of
        // a hash link pointing to another page has not been rendered yet when
        // the scroll behavior is called.
        requestAnimationFrame(() => {
          // `getElementById` is used instead of `querySelector`, as an id may
          // contain characters that are invalid in a CSS selector, e.g. the
          // space in `#foo bar` or the `:` in `#foo:1`
          document.getElementById(id)?.scrollIntoView({ block: 'start' })
        })

        return false
      }
      return { top: 0 }
    },
  })

  // ensure page data and page component have been loaded before resolving the route,
  // and save page data to route meta
  router.beforeResolve(async (to, from): Promise<string | void> => {
    if (to.path !== from.path || from === START_LOCATION) {
      const route = resolveRoute(to.fullPath)

      if (route.path !== to.fullPath) {
        return route.path
      }
      const pageChunk = await route.loader()

      to.meta = {
        // attach route meta
        ...route.meta,
        // attach page chunk route meta
        _pageChunk: pageChunk,
      }
    } else if (to.path === from.path) {
      to.meta = from.meta
    }
  })

  return router
}

declare module 'vue-router' {
  interface RouteMeta {
    /**
     * Store page chunk in route meta
     *
     * @internal only for internal use
     */
    _pageChunk?: PageChunk
  }
}
