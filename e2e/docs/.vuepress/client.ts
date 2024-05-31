import { defineClientConfig } from 'vuepress/client'
import RootComponentFromUserConfig from './components/RootComponentFromUserConfig.vue'

// static imported styles file
import '@vuepress-e2e/style-exports/foo.css'

export default defineClientConfig({
  async enhance() {
    // dynamic imported styles file
    await import('@vuepress-e2e/style-exports')
  },
  rootComponents: [RootComponentFromUserConfig],
})
