import { computed, defineAsyncComponent, defineComponent, h, watch } from 'vue'
import { usePageComponent, usePageFrontmatter } from '../composables/index.js'
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

    const frontmatter = usePageFrontmatter()
    watch(
      frontmatter,
      () => {
        runContentUpdatedCallbacks('updated')
      },
      { deep: true, flush: 'post' },
    )

    return () =>
      h(ContentComponent.value, {
        onVnodeMounted: () => {
          runContentUpdatedCallbacks('mounted')
        },
        onVnodeUpdated: () => {
          runContentUpdatedCallbacks('updated')
        },
        onVnodeBeforeUnmount: () => {
          runContentUpdatedCallbacks('beforeUnmount')
        },
      })
  },
})
