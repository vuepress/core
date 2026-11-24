import type { HistoryState, Router } from 'vue-router'

/**
 * The history state key that marks a navigation to skip the scroll restoration.
 */
const SKIP_SCROLL_RESTORATION_KEY = '__VUEPRESS_SKIP_SCROLL_RESTORATION__'

/**
 * Create a history state that skips the scroll restoration of a navigation.
 *
 * It is useful when a navigation only updates the hash and the page should not
 * be scrolled, such as updating the hash of the active header link.
 *
 * @param state - The existing history state to merge with
 * @returns The history state with the skip flag
 *
 * @example
 *   router.replace({
 *     hash: '#foo',
 *     state: createScrollRestorationSkipState(),
 *   })
 */
export const createScrollRestorationSkipState = (
  state: HistoryState = {},
): HistoryState => ({
  ...state,
  [SKIP_SCROLL_RESTORATION_KEY]: true,
})

/**
 * Consume the skip flag from the current history state.
 *
 * The flag is removed after being consumed, so the scroll restoration is only
 * skipped once.
 *
 * @param router - The router instance
 * @returns Whether the scroll restoration should be skipped
 */
export const consumeScrollRestorationSkip = (router: Router): boolean => {
  const { history } = router.options
  const { state } = history

  if (!state?.[SKIP_SCROLL_RESTORATION_KEY]) return false

  const nextState = { ...state }

  delete nextState[SKIP_SCROLL_RESTORATION_KEY]
  // replace the history state without triggering a navigation, so the flag is
  // also removed from the internal state of vue-router
  history.replace(history.location, nextState)

  return true
}
