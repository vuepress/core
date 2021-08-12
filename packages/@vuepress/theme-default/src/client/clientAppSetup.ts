import { defineClientAppSetup } from '@vuepress/client'
import { setupSidebarItems } from './composables'

export default defineClientAppSetup(() => {
  setupSidebarItems()
})
