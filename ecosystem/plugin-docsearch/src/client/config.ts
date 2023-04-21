import { defineClientConfig } from '@vuepress/client'
import { Docsearch } from './components/index.js'

export default defineClientConfig({
  enhance({ app }) {
    app.component('Docsearch', Docsearch)
  },
})
