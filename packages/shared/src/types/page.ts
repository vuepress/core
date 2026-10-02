import type { MarkdownItHeader } from '@mdit-vue/types'

import type { HeadConfig } from './head.js'

/**
 * Base type of vuepress page
 */
export interface PageBase<
  ExtraPageFrontmatter extends Record<string, unknown> = Record<
    string,
    unknown
  >,
> {
  /**
   * Canonical route key of the page
   *
   * It is always in the "clean" format, i.e. without the trailing `.html`
   * suffix. It is used as the key of the client route map and as the
   * canonical identity of the page across routes and redirects.
   *
   * @example '/guide'
   * @example '/2020/02/02/hello-world'
   * @example '/guide/'
   */
  routeKey: string

  /**
   * Path of the page in the current mode
   *
   * It is the actual route path that should be used to link the page. It
   * equals the `routeKey` when `route.cleanUrl` is enabled, or the `routeKey`
   * plus the `.html` suffix otherwise (the default behavior).
   *
   * @example '/guide.html'
   * @example '/guide'
   * @example '/guide/'
   */
  path: string

  /**
   * Title of the page
   */
  title: string

  /**
   * Language of the page
   */
  lang: string

  /**
   * Front matter of the page
   */
  frontmatter: PageFrontmatter<ExtraPageFrontmatter>
}

/**
 * Vuepress page data
 */
export type PageData<
  ExtraPageData extends Record<string, unknown> = Record<string, unknown>,
  ExtraPageFrontmatter extends Record<string, unknown> = Record<
    string,
    unknown
  >,
> = ExtraPageData & PageBase<ExtraPageFrontmatter>

/**
 * Vuepress page frontmatter
 *
 * Notice that frontmatter is parsed from yaml or other languages,
 * so we cannot guarantee the type safety
 */
export type PageFrontmatter<
  T extends Record<string, unknown> = Record<string, unknown>,
> = Partial<T> & {
  date?: Date | string
  description?: string
  head?: HeadConfig[]
  lang?: string
  layout?: string
  permalink?: string | null
  permalinkPattern?: string | null
  routeMeta?: Record<string, unknown>
  title?: string
}

/**
 * Vuepress page header
 */
export type PageHeader = MarkdownItHeader
