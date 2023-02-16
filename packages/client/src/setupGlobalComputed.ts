import { type App, computed, ref, watch } from 'vue'
import type { Router } from 'vue-router'
import {
  type LayoutsRef,
  layoutsSymbol,
  type PageData,
  pageData,
  type PageDataRef,
  type PageFrontmatter,
  type PageFrontmatterRef,
  pageFrontmatterSymbol,
  type PageHead,
  type PageHeadRef,
  pageHeadSymbol,
  type PageHeadTitle,
  type PageHeadTitleRef,
  pageHeadTitleSymbol,
  type PageLang,
  type PageLangRef,
  pageLangSymbol,
  type PageLayoutRef,
  pageLayoutSymbol,
  type RouteLocale,
  type RouteLocaleRef,
  routeLocaleSymbol,
  type SiteData,
  siteData,
  type SiteDataRef,
  type SiteLocaleData,
  type SiteLocaleDataRef,
  siteLocaleDataSymbol,
} from './composables/index.js'
import { withBase } from './helpers/index.js'
import { resolvers } from './resolvers.js'
import type { ClientConfig } from './types/index.js'

/**
 * Vuepress client global computed
 */
export interface GlobalComputed {
  layouts: LayoutsRef
  pageData: PageDataRef
  pageFrontmatter: PageFrontmatterRef
  pageHead: PageHeadRef
  pageHeadTitle: PageHeadTitleRef
  pageLang: PageLangRef
  pageLayout: PageLayoutRef
  routeLocale: RouteLocaleRef
  siteData: SiteDataRef
  siteLocaleData: SiteLocaleDataRef
}

/**
 * Create and provide global computed
 */
export const setupGlobalComputed = (
  app: App,
  router: Router,
  clientConfigs: ClientConfig[]
): GlobalComputed => {
  // create a manual computed route path, so that route hash changes won't trigger all downstream computed
  const routePath = ref(router.currentRoute.value.path)
  watch(
    () => router.currentRoute.value.path,
    (value) => (routePath.value = value)
  )

  // create global computed
  const layouts = computed(() => resolvers.resolveLayouts(clientConfigs))
  const routeLocale = computed(() =>
    resolvers.resolveRouteLocale(siteData.value.locales, routePath.value)
  )
  const siteLocaleData = computed(() =>
    resolvers.resolveSiteLocaleData(siteData.value, routeLocale.value)
  )
  const pageFrontmatter = computed(() =>
    resolvers.resolvePageFrontmatter(pageData.value)
  )
  const pageHeadTitle = computed(() =>
    resolvers.resolvePageHeadTitle(pageData.value, siteLocaleData.value)
  )
  const pageHead = computed(() =>
    resolvers.resolvePageHead(
      pageHeadTitle.value,
      pageFrontmatter.value,
      siteLocaleData.value
    )
  )
  const pageLang = computed(() => resolvers.resolvePageLang(pageData.value))
  const pageLayout = computed(() =>
    resolvers.resolvePageLayout(pageData.value, layouts.value)
  )

  // provide global computed
  app.provide(layoutsSymbol, layouts)
  app.provide(pageFrontmatterSymbol, pageFrontmatter)
  app.provide(pageHeadTitleSymbol, pageHeadTitle)
  app.provide(pageHeadSymbol, pageHead)
  app.provide(pageLangSymbol, pageLang)
  app.provide(pageLayoutSymbol, pageLayout)
  app.provide(routeLocaleSymbol, routeLocale)
  app.provide(siteLocaleDataSymbol, siteLocaleData)

  // provide global helpers
  Object.defineProperties(app.config.globalProperties, {
    $frontmatter: { get: () => pageFrontmatter.value },
    $head: { get: () => pageHead.value },
    $headTitle: { get: () => pageHeadTitle.value },
    $lang: { get: () => pageLang.value },
    $page: { get: () => pageData.value },
    $routeLocale: { get: () => routeLocale.value },
    $site: { get: () => siteData.value },
    $siteLocale: { get: () => siteLocaleData.value },
    $withBase: { get: () => withBase },
  })

  return {
    layouts,
    pageData,
    pageFrontmatter,
    pageHead,
    pageHeadTitle,
    pageLang,
    pageLayout,
    routeLocale,
    siteData,
    siteLocaleData,
  }
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
