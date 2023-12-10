import { defineClientConfig } from '@vuepress/client'
import CustomLayout from './layouts/CustomLayout.vue'
import Layout from './layouts/Layout.vue'
import NotFound from './layouts/NotFound.vue'

import './styles/index.scss'

export default defineClientConfig({
  enhance({ app, router }) {
    // ...
  },

  setup() {
    // ...
  },

  layouts: {
    CustomLayout,
    Layout,
    NotFound,
  },
})
