import { defineClientConfig } from 'vuepress/client'
import ComponentForMarkdownGlobal from './components/ComponentForMarkdownGlobal.vue'
import RootComponentFromUserConfig from './components/RootComponentFromUserConfig.vue'

// static imported styles file
import '@vuepress-e2e/style-exports/foo.css'

export default defineClientConfig({
  async enhance({ app }) {
    // register global components
    app.component('ComponentForMarkdownGlobal', ComponentForMarkdownGlobal)

    // dynamic imported styles file
    await import('@vuepress-e2e/style-exports')
  },
  rootComponents: [RootComponentFromUserConfig],
})
