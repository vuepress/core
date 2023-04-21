import { clientConfigs } from '@internal/clientConfigs'
import { createApp, createSSRApp, h } from 'vue'
import { RouterView } from 'vue-router'
import { siteData } from './composables/index.js'
import { createVueRouter } from './router.js'
import { setupGlobalComponents } from './setupGlobalComponents.js'
import { setupGlobalComputed } from './setupGlobalComputed.js'
import { setupUpdateHead } from './setupUpdateHead.js'
import type { CreateVueAppFunction } from './types/index.js'

/**
 * - use `createApp` in dev mode
 * - use `createSSRApp` in build mode
 */
const appCreator = __VUEPRESS_DEV__ ? createApp : createSSRApp

export const createVueApp: CreateVueAppFunction = async () => {
  // create vue app
  const app = appCreator({
    name: 'VuepressApp',

    setup() {
      // auto update head
      setupUpdateHead()

      // invoke all client setup
      for (const clientConfig of clientConfigs) {
        clientConfig.setup?.()
      }

      return () => [
        h(RouterView),
        ...clientConfigs.flatMap(({ rootComponents = [] }) =>
          rootComponents.map((component) => h(component))
        ),
      ]
    },
  })

  // create vue-router instance
  const router = createVueRouter()

  // global components and computed
  setupGlobalComponents(app)
  const globalComputed = setupGlobalComputed(app, router, clientConfigs)

  // setup devtools in dev mode
  if (__VUEPRESS_DEV__ || __VUE_PROD_DEVTOOLS__) {
    const { setupDevtools } = await import('./setupDevtools.js')
    setupDevtools(app, globalComputed)
  }

  // invoke all client enhance
  for (const clientConfig of clientConfigs) {
    await clientConfig.enhance?.({ app, router, siteData })
  }

  // vue-router will start to initialize once it is installed
  // via `app.use()`, but users might make some modifications
  // to router in client enhance, so we install it after that.
  // this can also avoid the `scrollBehavior` issue on initial
  // navigation.
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
