import { clientAppEnhances } from '@internal/clientAppEnhances'
import { clientAppRootComponents } from '@internal/clientAppRootComponents'
import { clientAppSetups } from '@internal/clientAppSetups'
import { pagesComponents } from '@internal/pagesComponents'
import { pagesRoutes } from '@internal/pagesRoutes'
import { removeEndingSlash } from '@vuepress/shared'
import { createApp, createSSRApp, h } from 'vue'
import type { App } from 'vue'
import {
  createRouter,
  createWebHistory,
  createMemoryHistory,
  RouterView,
  START_LOCATION,
} from 'vue-router'
import type { Router } from 'vue-router'
import {
  siteData,
  pageData,
  resolvePageData,
  setupUpdateHead,
} from './composables'
import { provideGlobalComputed } from './provideGlobalComputed'
import { registerGlobalComponents } from './registerGlobalComponents'

/**
 * - use `createApp` in dev mode
 * - use `createSSRApp` in build mode
 */
const appCreator = __VUEPRESS_DEV__ ? createApp : createSSRApp

/**
 * - use `createWebHistory` in dev mode and build mode client bundle
 * - use `createMemoryHistory` in build mode server bundle
 */
const historyCreator = __VUEPRESS_SSR__ ? createMemoryHistory : createWebHistory

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

  // create vue-router
  const router = createRouter({
    // TODO: it might be an issue of vue-router that have to remove the ending slash
    history: historyCreator(removeEndingSlash(siteData.value.base)),
    routes: pagesRoutes,
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) return savedPosition
      if (to.hash) return { el: to.hash }
      return { top: 0 }
    },
  })

  router.beforeResolve(async (to, from) => {
    if (to.path !== from.path || from === START_LOCATION) {
      // ensure page data and page component have been loaded
      ;[pageData.value] = await Promise.all([
        resolvePageData(to.name as string),
        pagesComponents[to.name as string]?.__asyncLoader(),
      ])
    }
  })

  // global computed and global components
  provideGlobalComputed(app, router)
  registerGlobalComponents(app)

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
