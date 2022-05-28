import type { SitemapImageOption, SitemapVideoOption } from './sitemap'

export interface SitemapFrontmatterOption {
  /**
   * Update Frequency
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
   * Whether to exclude this page from sitemap
   */
  exclude?: boolean

  /**
   * Priority of this page, supports 0.0 -1.0
   */
  priority?: number

  /**
   * Image config
   */
  img?: SitemapImageOption[]

  /**
   * Video config
   */
  video?: SitemapVideoOption[]
}
