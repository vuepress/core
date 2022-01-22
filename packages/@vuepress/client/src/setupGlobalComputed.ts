import { computed } from 'vue'
import type { App } from 'vue'
import type { Router } from 'vue-router'
import {
  pageData,
  pageFrontmatterSymbol,
  pageHeadSymbol,
  pageHeadTitleSymbol,
  pageLangSymbol,
  routeLocaleSymbol,
  siteData,
  siteLocaleDataSymbol,
} from './composables'
import type {
  PageData,
  PageDataRef,
  PageFrontmatter,
  PageFrontmatterRef,
  PageHead,
  PageHeadRef,
  PageHeadTitle,
  PageHeadTitleRef,
  PageLang,
  PageLangRef,
  RouteLocale,
  RouteLocaleRef,
  SiteData,
  SiteDataRef,
  SiteLocaleData,
  SiteLocaleDataRef,
} from './composables'
import { withBase } from './helpers'
import { resolvers } from './resolvers'

/**
 * Vuepress client global computed
 */
export interface GlobalComputed {
  pageData: PageDataRef
  pageFrontmatter: PageFrontmatterRef
  pageHead: PageHeadRef
  pageHeadTitle: PageHeadTitleRef
  pageLang: PageLangRef
  routeLocale: RouteLocaleRef
  siteData: SiteDataRef
  siteLocaleData: SiteLocaleDataRef
}

/**
 * Create and provide global computed
 */
export const setupGlobalComputed = (
  app: App,
  router: Router
): GlobalComputed => {
  // create global computed
  const routeLocale = computed(() =>
    resolvers.resolveRouteLocale(
      siteData.value.locales,
      router.currentRoute.value.path
    )
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

  // provide global computed
  app.provide(routeLocaleSymbol, routeLocale)
  app.provide(siteLocaleDataSymbol, siteLocaleData)
  app.provide(pageFrontmatterSymbol, pageFrontmatter)
  app.provide(pageHeadTitleSymbol, pageHeadTitle)
  app.provide(pageHeadSymbol, pageHead)
  app.provide(pageLangSymbol, pageLang)

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
    pageData,
    pageFrontmatter,
    pageHead,
    pageHeadTitle,
    pageLang,
    routeLocale,
    siteData,
    siteLocaleData,
  }
}

declare module '@vue/runtime-core' {
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
