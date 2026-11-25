import { onMounted, watch } from 'vue'
import type { RouteLocationNormalized, Router } from 'vue-router'
import { useRoute } from 'vue-router'
import { useScrollRestoration } from 'vue-router/experimental'

import { SKIP_SCROLL_RESTORATION_KEY } from './constants.js'
import { restoreScroll } from './scrollRestoration.js'

/**
 * Start tracking scroll restoration skips and return the root setup function.
 */
export const createScrollRestorationSetup = (router: Router): (() => void) => {
  const skippedRoutes = new WeakSet<RouteLocationNormalized>()

  router.afterEach((to, _from, failure) => {
    if (failure) return

    const { history } = router.options

    if (history.state[SKIP_SCROLL_RESTORATION_KEY] !== true) return

    skippedRoutes.add(to)

    // RouterHistory.replace() merges the provided state into the current
    // state, so omitting or deleting the key would preserve the old `true`.
    history.replace(history.location, {
      ...history.state,
      [SKIP_SCROLL_RESTORATION_KEY]: false,
    })
  })

  return () => {
    // VuePress renders its layout without a RouterView, so restore manually
    // once the root is mounted or has rendered the new route.
    const { scroll } = useScrollRestoration({ manual: true, restore: restoreScroll })
    const route = useRoute()

    const restoreScroll = (): void => {
      if (skippedRoutes.has(router.currentRoute.value)) return

      scroll()
    }

    onMounted(restoreScroll)
    watch(() => route.fullPath, restoreScroll, { flush: 'post' })
  }
}
