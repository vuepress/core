import { onUnmounted } from 'vue'
import { contentUpdatedCallbacks } from '../internal/contentUpdatedCallbacks'
import type { ContentUpdatedCallback } from '../types/index.js'

/**
 * Register callback that is called every time the markdown content is updated
 * in the DOM.
 */
export const onContentUpdated = (fn: ContentUpdatedCallback): void => {
  contentUpdatedCallbacks.add(fn)
  onUnmounted(() => {
    contentUpdatedCallbacks.delete(fn)
  })
}
