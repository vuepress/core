import { defineComponent, h } from 'vue'
import type { PropType } from 'vue'
import type { DocsearchOptions } from '../../shared/index.js'
import { useDocsearch } from '../composables/index.js'
import { options, searchButtonTemplate } from '../utils/index.js'

declare const __DOCSEARCH_INJECT_STYLES__: boolean

if (__DOCSEARCH_INJECT_STYLES__) {
  import('@docsearch/css')
  import('../styles/docsearch.css')
}

export const Docsearch = defineComponent({
  name: 'Docsearch',

  props: {
    containerId: {
      type: String,
      required: false,
      default: 'docsearch-container',
    },
    options: {
      type: Object as PropType<DocsearchOptions>,
      required: false,
      default: () => options,
    },
  },

  setup(props) {
    const { loaded, loadDocsearch } = useDocsearch(props)

    return () => [
      h('div', {
        id: props.containerId,
        style: { display: loaded.value ? 'block' : 'none' },
      }),
      loaded.value
        ? null
        : h('div', {
            onClick: () => loadDocsearch(),
            innerHTML: searchButtonTemplate,
          }),
    ]
  },
})
