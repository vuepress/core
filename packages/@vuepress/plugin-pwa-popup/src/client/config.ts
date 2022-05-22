import { defineClientConfig } from '@vuepress/client'
import { defineComponent, h } from 'vue'
import { PwaPopup } from './components'
import type { PwaPopupLocales } from './components'

declare const __PWA_POPUP_LOCALES__: PwaPopupLocales

const locales = __PWA_POPUP_LOCALES__

export default defineClientConfig({
  rootComponents: [
    // wrap the `<PwaPopup />` component with plugin options
    defineComponent(() => {
      if (__VUEPRESS_SSR__) return () => null
      return () => h(PwaPopup, { locales })
    }),
  ],
})
