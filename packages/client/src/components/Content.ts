import { computed, defineAsyncComponent, defineComponent, h } from 'vue'
import { usePageData } from '../composables/index.js'
import { resolveRoute } from '../router/index.js'

/**
 * Markdown rendered content
 */
export const Content = defineComponent({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: 'Content',

  props: {
    path: {
      type: String,
      required: false,
      default: '',
    },
  },

  setup(props) {
    const pageData = usePageData()
    const pageComponent = computed(() => {
      const route = resolveRoute(props.path || pageData.value.path)
      return defineAsyncComponent(() => route.loader().then(({ comp }) => comp))
    })

    return () => h(pageComponent.value)
  },
})
