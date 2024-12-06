import { onUnmounted } from 'vue'

let contentUpdatedCallbacks: (() => unknown)[] = []

/**
 * Register callback that is called every time the markdown content is updated
 * in the DOM.
 */
export const onContentUpdated = (fn: () => unknown): void => {
  contentUpdatedCallbacks.push(fn)
  onUnmounted(() => {
    contentUpdatedCallbacks = contentUpdatedCallbacks.filter((f) => f !== fn)
  })
}

/**
 * Call all registered callbacks
 */
export const runCallbacks = (): void => {
  contentUpdatedCallbacks.forEach((fn) => fn())
}
