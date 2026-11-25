import { onUnmounted } from 'vue'

import { contentUpdatedCallbacks } from '../internal/contentUpdatedCallbacks'
import type { ContentUpdatedCallback } from '../types/index.js'

/**
 * Register callback that is called every time the markdown content is updated
 * in the DOM.
 */
export const onContentUpdated = (fn: ContentUpdatedCallback): void => {
  // callbacks are only invoked on client side, and components are never
  // unmounted in ssr, so skip registering to avoid retaining them forever
  if (__VUEPRESS_SSR__) return

  contentUpdatedCallbacks.add(fn)
  onUnmounted(() => {
    contentUpdatedCallbacks.delete(fn)
  })
}
