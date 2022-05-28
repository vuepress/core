import type { Page } from '@vuepress/core'
import type { GitData } from '@vuepress/plugin-git'

export type ModifyTimeGetter = <ExtraPageData = { git: GitData }>(
  page: Page<ExtraPageData>
) => string

export interface SitemapOptions {
  /**
   * domain which to be deployed to
   */
  hostname: string

  /**
   * Extra urls to be included
   */
  extraUrls?: string[]

  /**
   * Urls to be excluded
   */
  excludeUrls?: string[]

  /**
   * Output file name, relative to dest folder
   *
   * @default 'sitemap.xml'
   */
  sitemapFilename?: string

  /**
   * Page default update frequency
   *
   * @default "daily"
   */
  changefreq?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never'

  /**
   * Date format function
   */
  modifyTimeGetter?: ModifyTimeGetter

  /**
   * XML namespaces to turn on - all by default
   */
  xmlNameSpace?: {
    news: boolean
    video: boolean
    xhtml: boolean
    image: boolean
    custom?: string[]
  }
}
