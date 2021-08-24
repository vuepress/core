import type { App } from 'vue'
import { ClientOnly, Content, OutboundLink } from './components'

/**
 * Register global built-in components
 */
export const registerGlobalComponents = (app: App): void => {
  /* eslint-disable vue/match-component-file-name */
  app.component('ClientOnly', ClientOnly)
  app.component('Content', Content)
  app.component('OutboundLink', OutboundLink)
  /* eslint-enable vue/match-component-file-name */
}
