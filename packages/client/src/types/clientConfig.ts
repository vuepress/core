import type { App, Component } from 'vue'
import type { Router } from 'vue-router'
import type { SiteDataRef } from '../composables/index.js'
import type { Layouts } from './layouts.js'

/**
 * Configure vuepress client
 */
export interface ClientConfig {
  /**
   * An enhance function to be called after vue app instance and
   * vue-router instance has been created
   */
  enhance?: (context: {
    app: App
    router: Router
    siteData: SiteDataRef
  }) => void | Promise<void>

  /**
   * A function to be called inside the setup function of vue app
   */
  setup?: () => void

  /**
   * Layout components
   */
  layouts?: Layouts

  /**
   * Components to be placed directly into the root node of vue app
   */
  rootComponents?: Component[]
}
