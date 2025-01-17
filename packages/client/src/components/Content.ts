import { computed, defineAsyncComponent, defineComponent, h, watch } from 'vue'
import { usePageComponent, useRoutePath } from '../composables/index.js'
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

    watch(useRoutePath(), () => {
      console.log('markdown route path changed')
    })
    watch(
      useRoutePath(),
      () => {
        console.log('markdown route path changed post')
      },
      { flush: 'post' },
    )

    return () => {
      console.log('render', ContentComponent.value)

      h(ContentComponent.value)
    }
  },
})
