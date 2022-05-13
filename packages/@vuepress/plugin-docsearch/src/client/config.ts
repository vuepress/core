import { defineClientConfig } from '@vuepress/client'
import { h } from 'vue'
import type { DocsearchOptions } from '../shared'
import { Docsearch } from './components'

declare const __DOCSEARCH_OPTIONS__: DocsearchOptions

const options = __DOCSEARCH_OPTIONS__

export default defineClientConfig({
  enhance: ({ app }) => {
    // wrap the `<Docsearch />` component with plugin options
    app.component('Docsearch', () => h(Docsearch, { options }))
  },
})
