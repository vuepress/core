import { defineClientConfig } from 'vuepress/client'

import RootComponentFromTheme from './components/RootComponentFromTheme.vue'
import CssModulesLayout from './layouts/CssModulesLayout.vue'
import CustomLayout from './layouts/CustomLayout.vue'
import Layout from './layouts/Layout.vue'
import NotFound from './layouts/NotFound.vue'

import './styles/index.scss'

export default defineClientConfig({
  enhance() {
    // ...
  },

  setup() {
    // ...
  },

  /* oxlint-disable typescript/no-unsafe-assignment -- Vue SFC type information is not available to Oxlint */
  layouts: {
    CssModulesLayout,
    CustomLayout,
    Layout,
    NotFound,
  },
  /* oxlint-enable typescript/no-unsafe-assignment */

  rootComponents: [RootComponentFromTheme],
})
