import { defineClientConfig } from '@vuepress/client'
import { h } from 'vue'
import type { DocsearchOptions } from '../shared/index.js'
import { Docsearch } from './components/index.js'

declare const __DOCSEARCH_OPTIONS__: DocsearchOptions

const options = __DOCSEARCH_OPTIONS__

export default defineClientConfig({
  enhance({ app }) {
    // wrap the `<Docsearch />` component with plugin options
    app.component('Docsearch', () => h(Docsearch, { options }))
  },
})
