import { computed, defineAsyncComponent, defineComponent, h } from 'vue'
import { runCallbacks, usePageComponent } from '../composables/index.js'
import { resolveRoute } from '../router/index.js'

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
        route.loader().then(({ comp }) => comp),
      )
    })

    return () =>
      h(ContentComponent.value, {
        onVnodeMounted: () => {
          runCallbacks('mounted')
        },
        onVnodeUpdated: () => {
          runCallbacks('change')
        },
        onVnodeBeforeUnmount: () => {
          runCallbacks('beforeUnmount')
        },
      })
  },
})
