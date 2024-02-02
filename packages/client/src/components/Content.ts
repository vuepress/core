import { computed, defineAsyncComponent, defineComponent, h } from 'vue'
import { usePageData } from '../composables/index.js'
import { resolvePage } from '../router/index.js'

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
    const page = usePageData()
    const pageComponent = computed(() => {
      const resolvedPage = resolvePage(props.path || page.value.path)
      return defineAsyncComponent(() =>
        resolvedPage.loader().then(({ comp }) => comp),
      )
    })

    return () => h(pageComponent.value)
  },
})
