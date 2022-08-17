import { pagesComponents } from '@internal/pagesComponents'
import { computed, defineComponent, h } from 'vue'
import { usePageData } from '../composables/index.js'

/**
 * Markdown rendered content
 */
export const Content = defineComponent({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: 'Content',

  props: {
    pageKey: {
      type: String,
      required: false,
      default: '',
    },
  },

  setup(props) {
    const page = usePageData()
    const pageComponent = computed(
      () => pagesComponents[props.pageKey || page.value.key]
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
              : '404 Not Found'
          )
  },
})
