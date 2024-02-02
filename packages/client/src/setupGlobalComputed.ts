import { computedWithControl } from '@vueuse/core'
import type { App } from 'vue'
import { computed } from 'vue'
import type { Router } from 'vue-router'
import type {
  LayoutsRef,
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
  PageLayoutRef,
  RouteLocale,
  RouteLocaleRef,
  SiteData,
  SiteDataRef,
  SiteLocaleData,
  SiteLocaleDataRef,
} from './composables/index.js'
import {
  layoutsSymbol,
  pageDataSymbol,
  pageFrontmatterSymbol,
  pageHeadSymbol,
  pageHeadTitleSymbol,
  pageLangSymbol,
  pageLayoutSymbol,
  routeLocaleSymbol,
  siteData,
  siteLocaleDataSymbol,
} from './composables/index.js'
import { withBase } from './helpers/index.js'
import { resolvers } from './resolvers.js'
import { pagesMap } from './router/index.js'
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
  clientConfigs: ClientConfig[],
): GlobalComputed => {
  // route path of current page
  const routePath = computed(() => router.currentRoute.value.path)

  // load page data from route meta
  const pageData = computedWithControl(
    routePath,
    () => router.currentRoute.value.meta._data!,
  )
  // handle page data HMR
  if (__VUEPRESS_DEV__ && (import.meta.webpackHot || import.meta.hot)) {
    __VUE_HMR_RUNTIME__.updatePageData = async (data: PageData) => {
      const pageChunk = await pagesMap.value[data.path].loader()
      pagesMap.value[data.path].loader = () =>
        Promise.resolve({ comp: pageChunk.comp, data })
      if (data.path === router.currentRoute.value.meta._data?.path) {
        router.currentRoute.value.meta._data = data
        pageData.trigger()
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
  const pageFrontmatter = computed(() =>
    resolvers.resolvePageFrontmatter(pageData.value),
  )
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

  // provide global computed
  app.provide(layoutsSymbol, layouts)
  app.provide(pageDataSymbol, pageData)
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
