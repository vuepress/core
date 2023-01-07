import { defineClientConfig } from '@vuepress/client'
import { hasGlobalComponent } from '@vuepress/helper/client'
import { h } from 'vue'
import type { ExternalLinkIconLocales } from '../shared/index.js'
import { ExternalLinkIcon } from './components/index.js'

declare const __EXTERNAL_LINK_ICON_LOCALES__: ExternalLinkIconLocales

const locales = __EXTERNAL_LINK_ICON_LOCALES__

export default defineClientConfig({
  enhance({ app }) {
    // only register when ExternalLinkIcon is not found in global components
    // so that users can provide their own icon component
    if (hasGlobalComponent('ExternalLinkIcon', app)) {
      // wrap the `<ExternalLinkIcon />` component with plugin options
      app.component('ExternalLinkIcon', h(ExternalLinkIcon, { locales }))
    }
  },
})
