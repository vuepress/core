import type { PageRedirectsMap, PagesMap } from '@internal/pagesMap'
import { dedupeHead, isString, resolveLocalePath } from '@vuepress/shared'
import type { Component } from 'vue'
import { reactive } from 'vue'
import type {
  PageData,
  PageFrontmatter,
  PageHead,
  PageHeadTitle,
  PageLang,
  RouteLocale,
  SiteData,
  SiteLocaleData,
} from './composables/index.js'
import { pageDataEmpty } from './composables/index.js'
import { LAYOUT_NAME_DEFAULT, LAYOUT_NAME_NOT_FOUND } from './constants.js'
import type { ClientConfig, Layouts } from './types/index.js'

/**
 * Resolver methods to get global computed
 *
 * Users can override corresponding method for advanced customization
 */
export const resolvers = reactive({
  /**
   * Resolve layouts component map
   */
  resolveLayouts: (clientConfigs: ClientConfig[]): Layouts =>
    clientConfigs.reduce(
      (prev, item) => ({
        ...prev,
        ...item.layouts,
      }),
      {} as Layouts,
    ),

  /**
   * Resolve page info according to page path
   */
  resolvePagePath: <PageMeta>(
    pagesMap: PagesMap<PageMeta>,
    redirectsMap: PageRedirectsMap,
    path: string,
  ): string => {
    path = normalizePath(path)

    // original path
    if (pagesMap.has(path)) return path

    // encoded path
    const encodedPath = encodeURI(path)
    if (pagesMap.has(encodedPath)) return encodedPath

    return (
      // redirects
      redirectsMap.get(path) ||
      // if no match at this point, then we should leave the path as is
      path
    )
  },

  /**
   * Resolve page data according to page path and page info
   */
  resolvePageData: async (
    pageData: PageData,
    _path: string,
  ): Promise<PageData> => Promise.resolve(pageData ?? pageDataEmpty),
  /**
   * Resolve page frontmatter from page data
   */
  resolvePageFrontmatter: (pageData: PageData): PageFrontmatter =>
    pageData.frontmatter,

  /**
   * Merge the head config in frontmatter and site locale
   *
   * Frontmatter should take priority over site locale
   */
  resolvePageHead: (
    headTitle: PageHeadTitle,
    frontmatter: PageFrontmatter,
    siteLocale: SiteLocaleData,
  ): PageHead => {
    const description = isString(frontmatter.description)
      ? frontmatter.description
      : siteLocale.description
    const head: PageHead = [
      ...(Array.isArray(frontmatter.head) ? frontmatter.head : []),
      ...siteLocale.head,
      ['title', {}, headTitle],
      ['meta', { name: 'description', content: description }],
    ]
    return dedupeHead(head)
  },

  /**
   * Resolve the content of page head title
   *
   * It would be used as the content of the `<title>` tag
   */
  resolvePageHeadTitle: (
    page: PageData,
    siteLocale: SiteLocaleData,
  ): PageHeadTitle =>
    [page.title, siteLocale.title].filter((item) => !!item).join(' | '),

  /**
   * Resolve page language from page data
   *
   * It would be used as the `lang` attribute of `<html>` tag
   */
  resolvePageLang: (page: PageData, siteLocale: SiteLocaleData): PageLang =>
    page.lang || siteLocale.lang || 'en-US',

  /**
   * Resolve layout component of current page
   */
  resolvePageLayout: (page: PageData, layouts: Layouts): Component => {
    let layoutName: string

    // if current page exists
    if (page.path) {
      // use layout from frontmatter
      const frontmatterLayout = page.frontmatter.layout

      if (isString(frontmatterLayout)) {
        layoutName = frontmatterLayout
      } else {
        // fallback to default layout
        layoutName = LAYOUT_NAME_DEFAULT
      }
    }
    // if current page does not exist
    else {
      // use NotFound layout
      layoutName = LAYOUT_NAME_NOT_FOUND
    }
    return layouts[layoutName]
  },

  /**
   * Resolve locale path according to route path and locales config
   */
  resolveRouteLocale: (
    locales: SiteData['locales'],
    routePath: string,
  ): RouteLocale => resolveLocalePath(locales, routePath),

  /**
   * Resolve site data for specific locale
   *
   * It would merge the locales fields to the root fields
   */
  resolveSiteLocaleData: (
    site: SiteData,
    routeLocale: RouteLocale,
  ): SiteLocaleData => ({
    ...site,
    ...site.locales[routeLocale],
    head: [
      // when merging head, the locales head should be placed before root head
      // to get higher priority
      ...(site.locales[routeLocale]?.head ?? []),
      ...(site.head ?? []),
    ],
  }),
})
