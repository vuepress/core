import type { App } from 'vue'
import type { Router } from 'vue-router'

export type CreateVueAppFunction = () => Promise<{
  app: App
  router: Router
}>
