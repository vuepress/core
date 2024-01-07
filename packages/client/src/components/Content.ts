import { computed, defineComponent, h } from 'vue'
import { pagesMap, usePageData } from '../composables/index.js'

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
    const pageComponent = computed(
      () => pagesMap.value.get(props.path || page.value.path)?.comp,
    )
    return () =>
      pageComponent.value
        ? // use page component
          h(pageComponent.value)
        : // fallback content
          h(
            'div',
            __VUEPRESS_DEV__
              ? 'Page does not exist. This is a fallback content.'
              : '404 Not Found',
          )
  },
})
