import { defineClientConfig } from '@vuepress/client'
import type { GoogleAnalyticsPluginOptions } from '../shared/index.js'
import { useGoogleAnalytics } from './composables/index.js'

declare const __GA_OPTIONS__: GoogleAnalyticsPluginOptions

const options = __GA_OPTIONS__

export default defineClientConfig({
  enhance() {
    if (__VUEPRESS_SSR__) return
    useGoogleAnalytics(options)
  },
})
