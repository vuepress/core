import { computed, defineAsyncComponent, defineComponent, h, watch } from 'vue'
import { useData } from '../composables/index.js'
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
    const { frontmatter, pageComponent } = useData()
    const ContentComponent = computed(() => {
      if (!props.path) return pageComponent.value
      const route = resolveRoute(props.path)
      return defineAsyncComponent(async () =>
        route.loader().then(({ comp }) => comp),
      )
    })

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
