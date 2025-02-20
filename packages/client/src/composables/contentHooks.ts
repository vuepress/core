import { onUnmounted } from 'vue'

type ContentUpdatedReason = 'beforeUnmount' | 'mounted' | 'updated'
type ContentUpdatedCallback = (reason: ContentUpdatedReason) => unknown

let contentUpdatedCallbacks: ContentUpdatedCallback[] = []

/**
 * Register callback that is called every time the markdown content is updated
 * in the DOM.
 */
export const onContentUpdated = (fn: ContentUpdatedCallback): void => {
  contentUpdatedCallbacks.push(fn)
  onUnmounted(() => {
    contentUpdatedCallbacks = contentUpdatedCallbacks.filter((f) => f !== fn)
  })
}

export function runCallbacks(reason: ContentUpdatedReason): void {
  contentUpdatedCallbacks.forEach((fn) => fn(reason))
}
