import { defineClientConfig } from 'vuepress/client'
import RootComponentFromUserConfig from './components/RootComponentFromUserConfig.vue'

export default defineClientConfig({
  rootComponents: [RootComponentFromUserConfig],
})
