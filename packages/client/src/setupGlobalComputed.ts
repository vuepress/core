import type { App } from 'vue'
import { computed, customRef } from 'vue'
import type { Router } from 'vue-router'
import { dataSymbol } from './composables/index.js'
import { redirects, routes } from './internal/routes.js'
import { siteData } from './internal/siteData.js'
import { resolvers } from './resolvers.js'
import type {
  ClientConfig,
  Data,
  PageChunk,
  PageData,
  PageFrontmatter,
  PageHead,
  PageHeadTitle,
  PageLang,
  RouteLocale,
  SiteData,
  SiteLocaleData,
} from './types/index.js'
import { withBase } from './utils/index.js'

/**
 * Create and provide global computed
 */
export const setupGlobalComputed = (
  app: App,
  router: Router,
  clientConfigs: ClientConfig[],
): Data => {
  // route path of current page
  const routePath = computed(() => router.currentRoute.value.path)

  // load page chunk from route meta
  const pageChunk = customRef<PageChunk>((track, trigger) => ({
    get() {
      track()
      return router.currentRoute.value.meta._pageChunk!
    },
    set(value) {
      router.currentRoute.value.meta._pageChunk = value
      trigger()
    },
  }))

  // handle page data HMR
  if (__VUEPRESS_DEV__ && (import.meta.webpackHot || import.meta.hot)) {
    __VUE_HMR_RUNTIME__.updatePageData = async (newPageData: PageData) => {
      const oldPageChunk = await routes.value[newPageData.path].loader()
      const newPageChunk = { comp: oldPageChunk.comp, data: newPageData }
      routes.value[newPageData.path].loader = async () =>
        Promise.resolve(newPageChunk)
      if (
        newPageData.path ===
        router.currentRoute.value.meta._pageChunk?.data.path
      ) {
        pageChunk.value = newPageChunk
      }
    }
  }

  // create other global computed
  const layouts = computed(() => resolvers.resolveLayouts(clientConfigs))
  const routeLocale = computed(() =>
    resolvers.resolveRouteLocale(siteData.value.locales, routePath.value),
  )
  const siteLocale = computed(() =>
    resolvers.resolveSiteLocale(siteData.value, routeLocale.value),
  )
  const page = computed(() => pageChunk.value.data)
  const frontmatter = computed(() => page.value.frontmatter)
  const lang = computed(() =>
    resolvers.resolveLang(page.value, siteLocale.value),
  )
  const headTitle = computed(() =>
    resolvers.resolveHeadTitle(page.value, siteLocale.value),
  )
  const head = computed(() =>
    resolvers.resolveHead(headTitle.value, frontmatter.value, siteLocale.value),
  )
  const pageComponent = computed(() => pageChunk.value.comp)
  const pageLayout = computed(() =>
    resolvers.resolveLayout(page.value, layouts.value),
  )

  // provide global computed in clientData
  const clientData: Data = {
    // site
    site: siteData,
    siteLocale,

    // route
    routes,
    redirects,
    routeLocale,
    routePath,

    // page
    frontmatter,
    head,
    headTitle,
    lang,
    page,

    // internal
    layouts,
    pageComponent,
    pageLayout,
  }
  app.provide(dataSymbol, clientData)

  // provide global helpers
  Object.defineProperties(app.config.globalProperties, {
    // site
    $site: { get: () => siteData.value },
    $siteLocale: { get: () => siteLocale.value },

    // route
    // $router and $route are provided by vue-router
    $routeLocale: { get: () => routeLocale.value },

    // page
    $frontmatter: { get: () => frontmatter.value },
    $head: { get: () => head.value },
    $lang: { get: () => lang.value },
    $page: { get: () => page.value },

    // helper
    $withBase: { get: () => withBase },
  })

  return clientData
}

declare module 'vue' {
  export interface ComponentCustomProperties {
    $frontmatter: PageFrontmatter
    $head: PageHead
    $headTitle: PageHeadTitle
    $lang: PageLang
    $page: PageData
    $routeLocale: RouteLocale
    $site: SiteData
    $siteLocale: SiteLocaleData
    $withBase: typeof withBase
  }
}
