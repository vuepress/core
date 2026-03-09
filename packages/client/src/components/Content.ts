import { computed, defineAsyncComponent, defineComponent, h } from 'vue'
import { usePageComponent } from '../composables/index.js'
import { contentUpdatedCallbacks } from '../internal/contentUpdatedCallbacks'
import { resolveRoute } from '../router/index.js'
import type { ContentUpdatedReason } from '../types/index.js'

/**
 * Execute all callbacks registered via `onContentUpdated`.
 *
 * @internal
 */
const runContentUpdatedCallbacks = (reason: ContentUpdatedReason): void => {
  contentUpdatedCallbacks.forEach((fn) => fn(reason))
}

/**
 * Markdown rendered content
 */
export const Content = defineComponent({
  name: 'Content',

  props: {
    path: {
      type: String,
      required: false,
      default: '',
    },
  },

  setup(props) {
    const pageComponent = usePageComponent()
    const ContentComponent = computed(() => {
      if (!props.path) return pageComponent.value
      const route = resolveRoute(props.path)
      return defineAsyncComponent(async () =>
        route.loader().then((m) => m.default),
      )
    })

    return () =>
      h(ContentComponent.value, {
        onVnodeMounted: () => {
          runContentUpdatedCallbacks('mounted')
          // When @vitejs/plugin-vue handles HMR for .md files, it calls
          // reload() instead of rerender(), causing the page component to be
          // fully unmounted and remounted. In this case onVnodeUpdated never
          // fires, so we detect the HMR remount via the flag set by
          // updatePageData and fire 'updated' here instead.
          if (__VUE_HMR_RUNTIME__.contentUpdated) {
            __VUE_HMR_RUNTIME__.contentUpdated = false
            runContentUpdatedCallbacks('updated')
          }
        },
        onVnodeUpdated: () => {
          // Consume the flag to prevent double 'updated' firing in bundlers
          // where onVnodeUpdated fires normally (e.g. webpack).
          __VUE_HMR_RUNTIME__.contentUpdated = false
          runContentUpdatedCallbacks('updated')
        },
        onVnodeBeforeUnmount: () => {
          runContentUpdatedCallbacks('beforeUnmount')
        },
      })
  },
})
