import { clientConfigs } from '@internal/clientConfigs'
import { createApp, createSSRApp, h, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  SCROLL_RESTORATION_CAPTURE_DEFAULT,
  SCROLL_RESTORATION_RESTORE_DEFAULT,
  ScrollRestoration,
  useScrollRestoration,
} from 'vue-router/experimental'

import { usePageLayout } from './composables/index.js'
import { siteData } from './internal/siteData.js'
import { createVueRouter } from './router/createVueRouter.js'
import { setupGlobalComponents } from './setupGlobalComponents.js'
import { setupGlobalComputed } from './setupGlobalComputed.js'
import { setupUpdateHead } from './setupUpdateHead.js'
import type { CreateVueAppFunction } from './types/index.js'

import '@internal/userStyle'

/**
 * - use `createApp` in dev mode
 * - use `createSSRApp` in build mode
 */
const appCreator = __VUEPRESS_DEV__ ? createApp : createSSRApp

export const createVueApp: CreateVueAppFunction = async () => {
  // create vue app
  const app = appCreator({
    name: 'Vuepress',

    setup() {
      // auto update head
      setupUpdateHead()

      // invoke all client setup
      for (const clientConfig of clientConfigs) {
        clientConfig.setup?.()
      }

      // get all root components
      const clientRootComponents = clientConfigs.flatMap(
        ({ rootComponents = [] }) =>
          rootComponents.map((component) => h(component)),
      )

      // get page layout
      const pageLayout = usePageLayout()

      // restore the scroll position once the new page has been rendered
      //
      // vuepress renders the page layout directly instead of wrapping it in a
      // `<RouterView>`, so the restoration provided by `onRouteRendered` would
      // run before the new page is rendered. It is thus triggered manually
      // after mounting and after each route change instead.
      const { scroll } = useScrollRestoration({ manual: true })
      const route = useRoute()

      onMounted(scroll)
      watch(
        () => route.fullPath,
        () => {
          scroll()
        },
        { flush: 'post' },
      )

      // render layout and root components
      return () => [h(pageLayout.value), clientRootComponents]
    },
  })

  // create vue-router instance
  const router = createVueRouter()

  // global components and computed
  setupGlobalComponents(app)
  const globalComputed = setupGlobalComputed(app, router, clientConfigs)

  // setup devtools in dev mode
  if (__VUEPRESS_DEV__ || __VUE_PROD_DEVTOOLS__) {
    const { setupDevtools } = await import('./devtools/setupDevtools.js')
    setupDevtools(app, globalComputed)
  }

  // invoke all client enhance
  for (const clientConfig of clientConfigs) {
    await clientConfig.enhance?.({ app, router, siteData })
  }

  // enable scroll restoration before installing the router
  // https://router.vuejs.org/experimental/scroll-restoration.html
  app.use(ScrollRestoration, {
    router,
    // use the default capture and restore implementations
    capture: SCROLL_RESTORATION_CAPTURE_DEFAULT,
    restore: SCROLL_RESTORATION_RESTORE_DEFAULT,
  })

  // vue-router will start to initialize once it is installed
  // via `app.use()`, but users might make some modifications
  // to router in client enhance, so we install it after that.
  app.use(router)

  return {
    app,
    router,
  }
}

// mount app in client bundle
if (!__VUEPRESS_SSR__) {
  void createVueApp().then(({ app, router }) => {
    void router.isReady().then(() => {
      app.mount('#app')
    })
  })
}
