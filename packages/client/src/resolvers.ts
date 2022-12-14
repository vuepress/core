import {
  dedupeHead,
  isArray,
  isString,
  resolveLocalePath,
} from '@vuepress/shared'
import type { Component } from 'vue'
import { reactive } from 'vue'
import {
  type PageData,
  pageDataEmpty,
  type PageFrontmatter,
  type PageHead,
  type PageHeadTitle,
  type PageLang,
  pagesData,
  type RouteLocale,
  type SiteData,
  type SiteLocaleData,
} from './composables/index.js'
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
      {} as Layouts
    ),

  /**
   * Resolve page data according to page key
   */
  resolvePageData: async (pageKey: string): Promise<PageData> => {
    const pageDataResolver = pagesData.value[pageKey]
    const pageData = await pageDataResolver?.()
    return pageData ?? pageDataEmpty
  },

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
    siteLocale: SiteLocaleData
  ): PageHead => {
    const description = isString(frontmatter.description)
      ? frontmatter.description
      : siteLocale.description
    const head: PageHead = [
      ...(isArray(frontmatter.head) ? frontmatter.head : []),
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
    siteLocale: SiteLocaleData
  ): PageHeadTitle =>
    [page.title, siteLocale.title].filter((item) => !!item).join(' | '),

  /**
   * Resolve page language from page data
   *
   * It would be used as the `lang` attribute of `<html>` tag
   */
  resolvePageLang: (page: PageData): PageLang => page.lang || 'en',

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
    routePath: string
  ): RouteLocale => resolveLocalePath(locales, routePath),

  /**
   * Resolve site data for specific locale
   *
   * It would merge the locales fields to the root fields
   */
  resolveSiteLocaleData: (
    site: SiteData,
    routeLocale: RouteLocale
  ): SiteLocaleData => ({
    ...site,
    ...site.locales[routeLocale],
  }),
})
