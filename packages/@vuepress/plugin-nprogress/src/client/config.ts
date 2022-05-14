import { defineClientConfig } from '@vuepress/client'
import { useNprogress } from './composables'

export default defineClientConfig({
  setup() {
    useNprogress()
  },
})
