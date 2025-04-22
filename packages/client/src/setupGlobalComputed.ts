import type { App } from 'vue'
import { computed, customRef } from 'vue'
import type { Router } from 'vue-router'
import { clientDataSymbol } from './composables/index.js'
import { redirects, routes } from './internal/routes.js'
import { siteData } from './internal/siteData.js'
import { resolvers } from './resolvers.js'
import type {
  ClientConfig,
  ClientData,
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
): ClientData => {
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
  const siteLocaleData = computed(() =>
    resolvers.resolveSiteLocaleData(siteData.value, routeLocale.value),
  )
  const pageComponent = computed(() => pageChunk.value.comp)
  const pageData = computed(() => pageChunk.value.data)
  const pageFrontmatter = computed(() => pageData.value.frontmatter)
  const pageHeadTitle = computed(() =>
    resolvers.resolvePageHeadTitle(pageData.value, siteLocaleData.value),
  )
  const pageHead = computed(() =>
    resolvers.resolvePageHead(
      pageHeadTitle.value,
      pageFrontmatter.value,
      siteLocaleData.value,
    ),
  )
  const pageLang = computed(() =>
    resolvers.resolvePageLang(pageData.value, siteLocaleData.value),
  )
  const pageLayout = computed(() =>
    resolvers.resolvePageLayout(pageData.value, layouts.value),
  )

  // provide global computed in clientData
  const clientData: ClientData = {
    layouts,
    pageData,
    pageComponent,
    pageFrontmatter,
    pageHead,
    pageHeadTitle,
    pageLang,
    pageLayout,
    redirects,
    routeLocale,
    routePath,
    routes,
    siteData,
    siteLocaleData,

    /* Aliases */
    frontmatter: pageFrontmatter,
    head: pageHead,
    headTitle: pageHeadTitle,
    lang: pageLang,
    site: siteData,
    siteLocale: siteLocaleData,
  }
  app.provide(clientDataSymbol, clientData)

  // provide global helpers
  Object.defineProperties(app.config.globalProperties, {
    $pageFrontmatter: { get: () => pageFrontmatter.value },
    $pageHead: { get: () => pageHead.value },
    $pageHeadTitle: { get: () => pageHeadTitle.value },
    $pageLang: { get: () => pageLang.value },
    $pageData: { get: () => pageData.value },
    $routeLocale: { get: () => routeLocale.value },
    $withBase: { get: () => withBase },

    /* Aliases */
    $frontmatter: { get: () => pageFrontmatter.value },
    $head: { get: () => pageHead.value },
    $headTitle: { get: () => pageHeadTitle.value },
    $lang: { get: () => pageLang.value },
    $page: { get: () => pageData.value },
    $site: { get: () => siteData.value },
    $siteLocale: { get: () => siteLocaleData.value },
  })

  return clientData
}

declare module 'vue' {
  export interface ComponentCustomProperties {
    $pageFrontmatter: PageFrontmatter
    $pageHead: PageHead
    $pageHeadTitle: PageHeadTitle
    $pageLang: PageLang
    $pageData: PageData
    $routeLocale: RouteLocale
    $siteData: SiteData
    $siteLocaleData: SiteLocaleData
    $withBase: typeof withBase

    /* Aliases */
    $frontmatter: PageFrontmatter
    $head: PageHead
    $headTitle: PageHeadTitle
    $lang: PageLang
    $page: PageData
    $site: SiteData
    $siteLocale: SiteLocaleData
  }
}
