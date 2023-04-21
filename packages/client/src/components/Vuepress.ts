import { defineComponent, h } from 'vue'
import { usePageLayout } from '../composables/index.js'

/**
 * Global Layout
 */
export const Vuepress = defineComponent({
  name: 'Vuepress',

  setup() {
    const layout = usePageLayout()
    return () => h(layout.value)
  },
})
