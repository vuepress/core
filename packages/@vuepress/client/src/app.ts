import { clientAppEnhances } from '@internal/clientAppEnhances'
import { clientAppRootComponents } from '@internal/clientAppRootComponents'
import { clientAppSetups } from '@internal/clientAppSetups'
import { createApp, createSSRApp, h } from 'vue'
import type { App } from 'vue'
import { RouterView } from 'vue-router'
import type { Router } from 'vue-router'
import { siteData } from './composables'
import { createVueRouter } from './router'
import { setupDevtools } from './setupDevtools'
import { setupGlobalComponents } from './setupGlobalComponents'
import { setupGlobalComputed } from './setupGlobalComputed'
import { setupUpdateHead } from './setupUpdateHead'

/**
 * - use `createApp` in dev mode
 * - use `createSSRApp` in build mode
 */
const appCreator = __VUEPRESS_DEV__ ? createApp : createSSRApp

export type CreateVueAppFunction = () => Promise<{
  app: App
  router: Router
}>

export const createVueApp: CreateVueAppFunction = async () => {
  // create vue app
  const app = appCreator({
    name: 'VuepressApp',

    setup() {
      // auto update head
      setupUpdateHead()

      // invoke all clientAppSetups
      for (const clientAppSetup of clientAppSetups) {
        clientAppSetup()
      }

      return () => [
        h(RouterView),
        ...clientAppRootComponents.map((comp) => h(comp)),
      ]
    },
  })

  // create vue-router instance
  const router = createVueRouter()

  // global components and computed
  setupGlobalComponents(app)
  const globalComputed = setupGlobalComputed(app, router)

  // setup devtools in dev mode
  if (__VUEPRESS_DEV__ || __VUE_PROD_DEVTOOLS__) {
    setupDevtools(app, globalComputed)
  }

  // invoke all clientAppEnhances
  for (const clientAppEnhance of clientAppEnhances) {
    await clientAppEnhance({ app, router, siteData })
  }

  // vue-router will start to initialize once it is installed
  // via `app.use()`, but users might make some modifications
  // to router in `clientAppEnhance`, so we install it after
  // that. This can also avoid the `scrollBehavior` issue on
  // initial navigation.
  app.use(router)

  return {
    app,
    router,
  }
}

// mount app in client bundle
if (!__VUEPRESS_SSR__) {
  createVueApp().then(({ app, router }) => {
    router.isReady().then(() => {
      app.mount('#app')
    })
  })
}
