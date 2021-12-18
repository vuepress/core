import { defineClientAppEnhance } from '@vuepress/client'
import { ExternalLinkIcon } from './components/ExternalLinkIcon'

export default defineClientAppEnhance(({ app }) => {
  app.component('ExternalLinkIcon', ExternalLinkIcon)
})
