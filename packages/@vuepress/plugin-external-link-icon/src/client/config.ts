import { defineClientConfig } from '@vuepress/client'
import { h } from 'vue'
import type { ExternalLinkIconLocales } from '../shared'
import { ExternalLinkIcon } from './components/ExternalLinkIcon'

declare const __EXTERNAL_LINK_ICON_LOCALES__: ExternalLinkIconLocales

const locales = __EXTERNAL_LINK_ICON_LOCALES__

export default defineClientConfig({
  enhance: ({ app }) => {
    // wrap the `<ExternalLinkIcon />` component with plugin options
    app.component('ExternalLinkIcon', h(ExternalLinkIcon, { locales }))
  },
})
