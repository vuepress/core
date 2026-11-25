import type { HistoryState, RouteLocationRaw } from 'vue-router'

import { SKIP_SCROLL_RESTORATION_KEY } from '../constants.js'

type RouteLocationObject = Exclude<RouteLocationRaw, string>

/**
 * Create a route location that skips VuePress default page scroll restoration
 * for that navigation.
 *
 * This is useful for navigations that only synchronize URL state and should
 * not move the viewport, such as updating the hash of an active header link.
 * Custom `scrollBehavior` and independent scroll restoration registrations are
 * not affected.
 *
 * @experimental - VuePress uses the `ScrollRestoration` plugin and the
 * `useScrollRestoration()` composable from `vue-router/experimental` for its
 * default page scroll restoration. This helper may change as those APIs evolve.
 *
 * @example
 *   router.replace(
 *     withoutScrollRestoration({
 *       path: router.currentRoute.value.path,
 *       hash: '#foo',
 *     }),
 *   )
 */
export const withoutScrollRestoration = <T extends RouteLocationObject>(
  to: T,
): Omit<T, 'state'> & { state: HistoryState } => {
  const state: HistoryState = {
    ...to.state,
    [SKIP_SCROLL_RESTORATION_KEY]: true,
  }

  return { ...to, state }
}
