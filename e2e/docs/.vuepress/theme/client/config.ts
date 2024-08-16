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

  /* eslint-disable @typescript-eslint/no-unsafe-assignment -- vue sfc type info is not available in eslint scope */
  layouts: {
    CssModulesLayout,
    CustomLayout,
    Layout,
    NotFound,
  },
  /* eslint-enable @typescript-eslint/no-unsafe-assignment */

  rootComponents: [RootComponentFromTheme],
})
