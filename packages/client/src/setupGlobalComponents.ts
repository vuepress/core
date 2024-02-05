import type { App } from 'vue'
import { ClientOnly, Content, RouteLink } from './components/index.js'

/**
 * Register global built-in components
 */
export const setupGlobalComponents = (app: App): void => {
  /* eslint-disable vue/match-component-file-name, vue/no-reserved-component-names */
  app.component('ClientOnly', ClientOnly)
  app.component('Content', Content)
  app.component('RouteLink', RouteLink)
  /* eslint-enable vue/match-component-file-name, vue/no-reserved-component-names */
}
