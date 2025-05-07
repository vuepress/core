import str from '@vuepress-e2e/conditional-exports'
import { defineClientConfig } from 'vuepress/client'
import ComponentForMarkdownGlobal from './components/ComponentForMarkdownGlobal.vue'
import OnContentUpdated from './components/OnContentUpdated.vue'
import RootComponentFromUserConfig from './components/RootComponentFromUserConfig.vue'

// static imported styles file
import '@vuepress-e2e/style-exports/foo.css'

console.log('user client:', str)

export default defineClientConfig({
  async enhance({ app }) {
    // register global components
    app.component('ComponentForMarkdownGlobal', ComponentForMarkdownGlobal)

    // dynamic imported styles file
    await import('@vuepress-e2e/style-exports')
  },
  rootComponents: [OnContentUpdated, RootComponentFromUserConfig],
})
