import { computed } from 'vue'
import type { App } from 'vue'
import type { Router } from 'vue-router'
import {
  siteData,
  pageData,
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
} from './composables'
import type {
  PageData,
  PageFrontmatter,
  PageHeadTitle,
  PageLang,
  RouteLocale,
  SiteData,
  SiteLocaleData,
} from './composables'
import { withBase } from './utils'

/**
 * Create and provide global computed
 */
export const provideGlobalComputed = (app: App, router: Router): void => {
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

  // provide global helpers
  Object.defineProperties(app.config.globalProperties, {
    $frontmatter: { get: () => pageFrontmatter.value },
    $headTitle: { get: () => pageHeadTitle.value },
    $lang: { get: () => pageLang.value },
    $page: { get: () => pageData.value },
    $routeLocale: { get: () => routeLocale.value },
    $site: { get: () => siteData.value },
    $siteLocale: { get: () => siteLocaleData.value },
    $withBase: { get: () => withBase },
  })
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $frontmatter: PageFrontmatter
    $headTitle: PageHeadTitle
    $lang: PageLang
    $page: PageData
    $routeLocale: RouteLocale
    $site: SiteData
    $siteLocale: SiteLocaleData
    $withBase: typeof withBase
  }
}
