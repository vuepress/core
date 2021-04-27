import { createApp, createSSRApp, computed, h } from 'vue'
import type { App, ComponentOptions } from 'vue'
import {
  createRouter,
  createWebHistory,
  createMemoryHistory,
  RouterView,
  START_LOCATION,
} from 'vue-router'
import type { Router } from 'vue-router'
import { removeEndingSlash } from '@vuepress/shared'
import { clientAppEnhances } from '@internal/clientAppEnhances'
import { clientAppRootComponents } from '@internal/clientAppRootComponents'
import { clientAppSetups } from '@internal/clientAppSetups'
import { pagesComponents } from '@internal/pagesComponents'
import { pagesRoutes } from '@internal/pagesRoutes'
import {
  siteData,
  pageData,
  resolvePageData,
  pageFrontmatterSymbol,
  resolvePageFrontmatter,
  pageHeadSymbol,
  resolvePageHead,
  pageHeadTitleSymbol,
  resolvePageHeadTitle,
  pageLangSymbol,
  resolvePageLang,
  routeLocaleSymbol,
  resolveRouteLocale,
  siteLocaleDataSymbol,
  resolveSiteLocaleData,
  useUpdateHead,
} from './injections'
import { ClientOnly, Content, OutboundLink } from './components'
import { withBase } from './utils'

/**
 * - use `createApp` in dev mode
 * - use `createSSRApp` in build mode
 */
const appCreator = __DEV__ ? createApp : createSSRApp

/**
 * - use `createWebHistory` in dev mode and build mode client bundle
 * - use `createMemoryHistory` in build mode server bundle
 */
const historyCreator = __SSR__ ? createMemoryHistory : createWebHistory

export type CreateVueAppFunction = () => Promise<{
  app: App
  router: Router
}>

export const createVueApp: CreateVueAppFunction = async () => {
  // options to create vue app
  const appOptions: ComponentOptions = {
    name: 'VuepressApp',

    setup() {
      // auto update head
      useUpdateHead()

      // invoke all clientAppSetups
      for (const clientAppSetup of clientAppSetups) {
        clientAppSetup()
      }

      return () => [
        h(RouterView),
        ...clientAppRootComponents.map((comp) => h(comp)),
      ]
    },
  }

  // create vue app
  const app = appCreator(appOptions)

  // create vue-router
  const router = createRouter({
    // TODO: it might be an issue of vue-router that have to remove the ending slash
    history: historyCreator(removeEndingSlash(siteData.value.base)),
    routes: pagesRoutes,
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition
      }

      if (to.hash) {
        return { el: to.hash }
      }

      return { top: 0 }
    },
  })

  router.beforeResolve(async (to, from) => {
    if (to.path !== from.path || from === START_LOCATION) {
      // ensure page data and page component have been loaded
      ;[pageData.value] = await Promise.all([
        resolvePageData(to.path),
        pagesComponents[to.path]?.__asyncLoader(),
      ])
    }
  })

  // create global computed
  const routeLocale = computed(() =>
    resolveRouteLocale(siteData.value.locales, router.currentRoute.value.path)
  )
  const siteLocaleData = computed(() =>
    resolveSiteLocaleData(siteData.value, routeLocale.value)
  )
  const pageFrontmatter = computed(() => resolvePageFrontmatter(pageData.value))
  const pageHeadTitle = computed(() =>
    resolvePageHeadTitle(pageData.value, siteLocaleData.value)
  )
  const pageHead = computed(() =>
    resolvePageHead(
      pageHeadTitle.value,
      pageFrontmatter.value,
      siteLocaleData.value
    )
  )
  const pageLang = computed(() => resolvePageLang(pageData.value))

  // provide global computed
  app.provide(routeLocaleSymbol, routeLocale)
  app.provide(siteLocaleDataSymbol, siteLocaleData)
  app.provide(pageFrontmatterSymbol, pageFrontmatter)
  app.provide(pageHeadTitleSymbol, pageHeadTitle)
  app.provide(pageHeadSymbol, pageHead)
  app.provide(pageLangSymbol, pageLang)

  // provide global data & helpers
  Object.defineProperties(app.config.globalProperties, {
    $routeLocale: {
      get() {
        return routeLocale.value
      },
    },
    $site: {
      get() {
        return siteData.value
      },
    },
    $siteLocale: {
      get() {
        return siteLocaleData.value
      },
    },
    $page: {
      get() {
        return pageData.value
      },
    },
    $frontmatter: {
      get() {
        return pageFrontmatter.value
      },
    },
    $lang: {
      get() {
        return pageLang.value
      },
    },
    $headTitle: {
      get() {
        return pageHeadTitle.value
      },
    },
    $withBase: {
      get() {
        return withBase
      },
    },
  })

  // register built-in components
  /* eslint-disable vue/match-component-file-name */
  app.component('ClientOnly', ClientOnly)
  app.component('Content', Content)
  app.component('OutboundLink', OutboundLink)
  /* eslint-enable vue/match-component-file-name */

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
if (!__SSR__) {
  createVueApp().then(({ app, router }) => {
    router.isReady().then(() => {
      app.mount('#app')
    })
  })
}
