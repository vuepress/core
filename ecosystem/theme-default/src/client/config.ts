import { defineClientConfig } from '@vuepress/client'
import { h } from 'vue'
import { Badge, CodeGroup, CodeGroupItem } from './components/global/index.js'
import {
  setupDarkMode,
  setupSidebarItems,
  useScrollPromise,
} from './composables/index.js'
import Layout from './layouts/Layout.vue'
import NotFound from './layouts/NotFound.vue'

import './styles/index.scss'

export default defineClientConfig({
  enhance({ app, router }) {
    app.component('Badge', Badge)
    app.component('CodeGroup', CodeGroup)
    app.component('CodeGroupItem', CodeGroupItem)

    // compat with @vuepress/plugin-external-link-icon
    app.component('AutoLinkExternalIcon', () => {
      const ExternalLinkIcon = app.component('ExternalLinkIcon')
      if (ExternalLinkIcon) {
        return h(ExternalLinkIcon)
      }
      return null
    })

    // compat with @vuepress/plugin-docsearch and @vuepress/plugin-search
    app.component('NavbarSearch', () => {
      const SearchComponent =
        app.component('Docsearch') || app.component('SearchBox')
      if (SearchComponent) {
        return h(SearchComponent)
      }
      return null
    })

    // handle scrollBehavior with transition
    const scrollBehavior = router.options.scrollBehavior!
    router.options.scrollBehavior = async (...args) => {
      await useScrollPromise().wait()
      return scrollBehavior(...args)
    }
  },

  setup() {
    setupDarkMode()
    setupSidebarItems()
  },

  layouts: {
    Layout,
    NotFound,
  },
})
