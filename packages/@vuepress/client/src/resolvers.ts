import {
  dedupeHead,
  isArray,
  isString,
  resolveLocalePath,
} from '@vuepress/shared'
import { reactive } from 'vue'
import { pageDataEmpty, pagesData } from './composables'
import type {
  PageData,
  PageFrontmatter,
  PageHead,
  PageHeadTitle,
  PageLang,
  RouteLocale,
  SiteData,
  SiteLocaleData,
} from './composables'

/**
 * Resolver methods to get global computed
 *
 * Users can override corresponding method for advanced customization
 */
export const resolvers = reactive({
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
    `${page.title ? `${page.title} | ` : ``}${siteLocale.title}`,

  /**
   * Resolve page language from page data
   *
   * It would be used as the `lang` attribute of `<html>` tag
   */
  resolvePageLang: (pageData: PageData): PageLang => pageData.lang || 'en',

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
