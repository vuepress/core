import { dedupeHead, isString, resolveLocalePath } from '@vuepress/shared'
import { reactive } from 'vue'
import { LANG_DEFAULT, LAYOUT_NAME_DEFAULT } from './constants.js'
import type {
  ClientConfig,
  Layouts,
  PageData,
  PageFrontmatter,
  PageHead,
  PageHeadTitle,
  PageLang,
  PageLayout,
  RouteLocale,
  SiteData,
  SiteLocaleData,
} from './types/index.js'

/**
 * Resolver methods to get global computed
 *
 * Users can override corresponding method for advanced customization
 *
 * @experimental - This is an experimental API and may be changed in minor versions
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
      {},
    ) as Layouts,

  /**
   * Merge the head config in frontmatter and site locale
   *
   * Frontmatter should take priority over site locale
   */
  resolvePageHead: (
    pageHeadTitle: PageHeadTitle,
    pageFrontmatter: PageFrontmatter,
    siteLocaleDate: SiteData,
  ): PageHead => {
    const description = isString(pageFrontmatter.description)
      ? pageFrontmatter.description
      : siteLocaleDate.description
    const head: PageHead = [
      ...(Array.isArray(pageFrontmatter.head) ? pageFrontmatter.head : []),
      ...siteLocaleDate.head,
      ['title', {}, pageHeadTitle],
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
    pageData: PageData,
    siteLocaleDate: SiteData,
  ): PageHeadTitle =>
    [pageData.title, siteLocaleDate.title].filter((item) => !!item).join(' | '),

  /**
   * Resolve page language from page data
   *
   * It would be used as the `lang` attribute of `<html>` tag
   */
  resolvePageLang: (pageData: PageData, siteLocaleData: SiteData): PageLang =>
    pageData.lang || siteLocaleData.lang || LANG_DEFAULT,

  /**
   * Resolve layout component of current page
   */
  resolvePageLayout: (pageData: PageData, layouts: Layouts): PageLayout => {
    const layoutName = isString(pageData.frontmatter.layout)
      ? pageData.frontmatter.layout
      : LAYOUT_NAME_DEFAULT
    if (!layouts[layoutName]) {
      throw new Error(`[vuepress] Cannot resolve layout: ${layoutName}`)
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
    { base, locales, ...siteData }: SiteData,
    routeLocale: RouteLocale,
  ): SiteLocaleData => ({
    ...siteData,
    ...locales[routeLocale],
    head: [
      // when merging head, the locales head should be placed before root head
      // to get higher priority
      ...(locales[routeLocale]?.head ?? []),
      ...(siteData.head ?? []),
    ],
  }),
})
