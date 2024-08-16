import type { App } from 'vue'
import { ClientOnly, Content, RouteLink } from './components/index.js'

/**
 * Register global built-in components
 */
export const setupGlobalComponents = (app: App): void => {
  app.component('ClientOnly', ClientOnly)
  app.component('Content', Content)
  app.component('RouteLink', RouteLink)
}
