import type { MarkdownLink } from '@vuepress/markdown'
import type { PageData, PageFrontmatter } from '@vuepress/shared'

/**
 * Vuepress Page
 */
export type Page<
  ExtraPageData extends Record<any, any> = Record<never, never>,
  ExtraPageFields extends Record<any, any> = Record<never, never>
> = PageData &
  ExtraPageFields & {
    /**
     * Data of the page, which will be available in client code
     */
    data: PageData<ExtraPageData>

    /**
     * Raw Content of the page
     */
    content: string

    /**
     * Rendered content of the page
     */
    contentRendered: string

    /**
     * Date of the page, in 'yyyy-MM-dd' format
     *
     * @example '2020-09-09'
     */
    date: string

    /**
     * Dependencies of the page
     */
    deps: string[]

    /**
     * Hoisted tags of the page
     */
    hoistedTags: string[]

    /**
     * Links of the page
     */
    links: MarkdownLink[]

    /**
     * Path of the page that inferred from file path
     *
     * If the page does not come from a file, it would be `null`
     *
     * @example '/guide/index.html'
     */
    pathInferred: string | null

    /**
     * Locale path prefix of the page
     *
     * @example '/getting-started.html' -> '/'
     * @example '/en/getting-started.html' -> '/en/'
     * @example '/zh/getting-started.html' -> '/zh/'
     */
    pathLocale: string

    /**
     * Permalink of the page
     *
     * If the page does not have a permalink, it would be `null`
     */
    permalink: string | null

    /**
     * Custom data to be attached to the page route record of vue-router
     *
     * @see https://next.router.vuejs.org/api/#meta
     */
    routeMeta: Record<string, unknown>

    /**
     * Slug of the page
     */
    slug: string

    /**
     * Source file path
     *
     * If the page does not come from a file, it would be `null`
     */
    filePath: string | null

    /**
     * Source file path relative to source directory
     *
     * If the page does not come from a file, it would be `null`
     */
    filePathRelative: string | null

    /**
     * Component file path
     */
    componentFilePath: string

    /**
     * Component file path relative to temp directory
     */
    componentFilePathRelative: string

    /**
     * Component file chunk name
     *
     * Only take effect in webpack
     */
    componentFileChunkName: string

    /**
     * Page data file path
     */
    dataFilePath: string

    /**
     * Page data file path relative to temp directory
     */
    dataFilePathRelative: string

    /**
     * Page data file chunk name
     *
     * Only take effect in webpack
     */
    dataFileChunkName: string

    /**
     * Rendered html file path
     */
    htmlFilePath: string

    /**
     * Rendered html file path relative to dest directory
     */
    htmlFilePathRelative: string
  }

/**
 * Options to create vuepress page
 */
export interface PageOptions {
  /**
   * If `filePath` is not set, this option will be used as the raw
   * markdown content of the page.
   *
   * If `filePath` is set, this option will be ignored, while the
   * content of the file will be used.
   */
  content?: string

  /**
   * Absolute file path of the markdown source file.
   */
  filePath?: string

  /**
   * Default frontmatter of the page, which could be overridden by
   * the frontmatter of the markdown content.
   */
  frontmatter?: PageFrontmatter

  /**
   * If this option is set, it will be used as the final route path
   * of the page, ignoring the relative path and permalink.
   */
  path?: string
}
