import { computed, defineAsyncComponent, defineComponent, h } from 'vue'
import { usePageComponent } from '../composables/index.js'
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
        route.loader().then((m) => m.default),
      )
    })

    return () => h(ContentComponent.value)
  },
})
