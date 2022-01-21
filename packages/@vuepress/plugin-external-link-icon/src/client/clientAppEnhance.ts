import { defineClientAppEnhance } from '@vuepress/client'
import { h } from 'vue'
import type { ExternalLinkIconLocales } from '../shared'
import { ExternalLinkIcon } from './components/ExternalLinkIcon'

declare const __EXTERNAL_LINK_ICON_LOCALES__: ExternalLinkIconLocales

const locales = __EXTERNAL_LINK_ICON_LOCALES__

export default defineClientAppEnhance(({ app }) => {
  app.component('ExternalLinkIcon', h(ExternalLinkIcon, { locales }))
})
