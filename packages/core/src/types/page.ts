import type { MarkdownLink, MarkdownSfcBlocks } from '@vuepress/markdown'
import type { PageBase, PageData, PageFrontmatter } from '@vuepress/shared'

/**
 * Vuepress Page
 */
export type Page<
  ExtraPageData extends Record<string, unknown> = Record<string, unknown>,
  ExtraPageFrontmatter extends Record<string, unknown> = Record<
    string,
    unknown
  >,
  ExtraPageFields extends Record<string, unknown> = Record<string, unknown>,
> = ExtraPageFields &
  PageBase<ExtraPageFrontmatter> & {
    /**
     * Data of the page, which will be available in client code
     */
    data: PageData<ExtraPageData, ExtraPageFrontmatter>

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
     * Links of the page
     */
    links: MarkdownLink[]

    /**
     * Markdown env object of the page
     */
    markdownEnv: Record<string, unknown>

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
     * Custom data to be attached to route record
     */
    routeMeta: Record<string, unknown>

    /**
     * Extracted sfc blocks of the page
     */
    sfcBlocks: MarkdownSfcBlocks

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
     * Chunk file path
     */
    chunkFilePath: string

    /**
     * Chunk file path relative to temp directory
     */
    chunkFilePathRelative: string

    /**
     * Chunk name
     *
     * This will only take effect in webpack
     */
    chunkName: string

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
   * The raw markdown content of the page.
   *
   * If `content` is not provided, the file content of the `filePath`
   * will be used.
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
