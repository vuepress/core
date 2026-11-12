import type { RouteLocationNormalized } from 'vue-router'
import type { ScrollRestorationSessionEntry } from 'vue-router/experimental'
import { SCROLL_RESTORATION_RESTORE_DEFAULT } from 'vue-router/experimental'

/**
 * Restore the scroll of the window after a navigation
 *
 * It behaves like `SCROLL_RESTORATION_RESTORE_DEFAULT`, except that a hash
 * target is scrolled with `scrollIntoView` instead of being resolved by its
 * bounding rect, so that `scroll-margin-top` / `scroll-padding-top` are
 * honored. Themes rely on them to keep anchor targets clear of a fixed
 * navbar.
 */
export const restoreScroll = (
  entry: ScrollRestorationSessionEntry | null | undefined,
  to: RouteLocationNormalized,
): void => {
  // a saved position takes precedence over the hash (e.g. going back or
  // forward), while a navigation without a hash always scrolls to the top
  if (entry?.default || !to.hash) {
    SCROLL_RESTORATION_RESTORE_DEFAULT(entry, to)
    return
  }

  const id = to.hash.slice(1)

  // the target element of a hash link pointing to another page is not
  // rendered yet when the scroll is triggered, so it is deferred to the
  // next frame
  requestAnimationFrame(() => {
    // `getElementById` is used instead of `querySelector`, as an id may
    // contain characters that are invalid in a CSS selector, e.g. the space
    // in `#foo bar` or the `:` in `#foo:1`
    const target = document.getElementById(id)

    if (target) target.scrollIntoView()
    // fall back to the default behavior when the target does not exist, which
    // scrolls to the top, instead of keeping the scroll position of the
    // previous page
    else SCROLL_RESTORATION_RESTORE_DEFAULT(entry, to)
  })
}
