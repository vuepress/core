import { computed, defineAsyncComponent, defineComponent, h } from 'vue'
import { useComponent } from '../composables/index.js'
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
    const component = useComponent()
    const ContentComponent = computed(() => {
      if (!props.path) return component.value
      const route = resolveRoute(props.path)
      return defineAsyncComponent(async () =>
        route.loader().then(({ comp }) => comp),
      )
    })

    return () => h(ContentComponent.value)
  },
})
