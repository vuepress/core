import type { MarkdownItHeader } from '@mdit-vue/types'
import type { HeadConfig } from './head.js'

/**
 * Base type of vuepress page
 */
export type PageBase<
  ExtraPageFrontmatter extends Record<any, any> = Record<string, unknown>,
> = {
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
  frontmatter: PageFrontmatter<ExtraPageFrontmatter>

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
  ExtraPageFrontmatter extends Record<any, any> = Record<string, unknown>,
> = PageBase<ExtraPageFrontmatter> & ExtraPageData

/**
 * Vuepress page frontmatter
 *
 * Notice that frontmatter is parsed from yaml or other languages,
 * so we cannot guarantee the type safety
 */
export type PageFrontmatter<
  T extends Record<any, any> = Record<string, unknown>,
> = Partial<T> & {
  date?: string | Date
  description?: string
  head?: HeadConfig[]
  lang?: string
  layout?: string
  permalink?: string
  permalinkPattern?: string | null
  routeMeta?: Record<string, unknown>
  title?: string
}

/**
 * Vuepress page header
 */
export type PageHeader = MarkdownItHeader
