import { clientConfigs } from '@internal/clientConfigs'
import { isString } from '@vuepress/shared'
import type { Component } from 'vue'
import { computed, defineComponent, h } from 'vue'
import { usePageData } from '../composables/index.js'

const layouts = clientConfigs.reduce(
  (prev, item) => ({
    ...prev,
    ...item.layouts,
  }),
  {} as Record<string, Component>
)

/**
 * Global Layout
 */
export const Vuepress = defineComponent({
  name: 'Vuepress',

  setup() {
    const page = usePageData()

    // resolve layout component
    const layoutComponent = computed(() => {
      // resolve layout name of current page
      let layoutName: string

      if (page.value.path) {
        // if current page exists

        // use layout from frontmatter
        const frontmatterLayout = page.value.frontmatter.layout

        if (isString(frontmatterLayout)) {
          layoutName = frontmatterLayout
        } else {
          // fallback to default layout
          layoutName = 'Layout'
        }
      } else {
        // if current page does not exist
        // use NotFound layout
        layoutName = 'NotFound'
      }
      return layouts[layoutName]
    })

    return () => h(layoutComponent.value)
  },
})
