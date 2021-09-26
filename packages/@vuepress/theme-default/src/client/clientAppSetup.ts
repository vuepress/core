import { defineClientAppSetup } from '@vuepress/client'
import { setupDarkMode, setupSidebarItems } from './composables'

export default defineClientAppSetup(() => {
  setupDarkMode()
  setupSidebarItems()
})
