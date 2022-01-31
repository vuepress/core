import type { HeadConfig } from './head'

/**
 * Vuepress basic page properties
 */
export type PageBase<ExtraPageFields, Frontmatter> = ExtraPageFields & {
  /**
   * Identifier of the page
   *
   * Will also be used as the component name
   *
   * @example 'v-foobar'
   */
  key: string

  /**
   * Route path of the page
   *
   * Firstly inferred from the file path
   *
   * Might be overridden by permalink
   *
   * @example '/guide/index.html'
   * @example '/2020/02/02/hello-world.html'
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
  frontmatter: Frontmatter

  /**
   * Excerpt of the page
   */
  excerpt: string

  /**
   * Headers of the page
   */
  headers: PageHeader[]
}

/**
 * Vuepress page data
 */
export type PageData<
  ExtraPageData extends Record<any, any> = Record<never, never>,
  Frontmatter extends PageFrontmatter = PageFrontmatter
> = PageBase<ExtraPageData, Frontmatter>

/**
 * Vuepress page frontmatter
 *
 * Notice that frontmatter is parsed from yaml or other languages,
 * so we cannot guarantee the type safety
 */
export type PageFrontmatter<
  T extends Record<any, any> = Record<string, unknown>
> = Partial<T> & {
  date?: string | Date
  description?: string
  head?: HeadConfig[]
  lang?: string
  layout?: string
  permalink?: string
  permalinkPattern?: string
  routeMeta?: Record<string, unknown>
  title?: string
}

/**
 * Vuepress page header
 */
export interface PageHeader {
  level: number
  title: string
  slug: string
  children: PageHeader[]
}
