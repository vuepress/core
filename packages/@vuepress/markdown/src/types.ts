import type { PageFrontmatter, PageHeader } from '@vuepress/shared'
import type * as MarkdownIt from 'markdown-it'
import type {
  AnchorPluginOptions,
  AssetsPluginOptions,
  CodePluginOptions,
  EmojiPluginOptions,
  ExtractHeadersPluginOptions,
  HoistTagsPluginOptions,
  ImportCodePluginOptions,
  LinksPluginOptions,
  TocPluginOptions,
} from './plugins'

export type Markdown = MarkdownIt

export interface MarkdownOptions extends MarkdownIt.Options {
  anchor?: false | AnchorPluginOptions
  assets?: false | AssetsPluginOptions
  code?: false | CodePluginOptions
  customComponent?: false
  emoji?: false | EmojiPluginOptions
  extractHeaders?: false | ExtractHeadersPluginOptions
  extractTitle?: false
  hoistTags?: false | HoistTagsPluginOptions
  importCode?: false | ImportCodePluginOptions
  links?: false | LinksPluginOptions
  slugify?: MarkdownSlugifyFunction
  toc?: false | TocPluginOptions
}

/**
 * Headers in markdown file
 */
export type MarkdownHeader = PageHeader

/**
 * Internal links in markdown file
 *
 * Used for file existence check
 */
export interface MarkdownLink {
  raw: string
  relative: string
  absolute: string
}

/**
 * The `env` object to be passed to markdown-it render function
 *
 * Input some meta data for markdown file parsing and rendering
 *
 * Output some resources from the markdown file
 */
export interface MarkdownEnv {
  // Input

  /**
   * Base / publicPath of current site
   */
  base?: string

  /**
   * Absolute file path of the markdown file
   */
  filePath?: string | null

  /**
   * Relative file path of the markdown file
   */
  filePathRelative?: string | null

  /**
   * Frontmatter of the markdown file
   */
  frontmatter?: PageFrontmatter

  // Output

  /**
   * Headers that extracted by extractHeadersPlugin
   */
  headers?: MarkdownHeader[]

  /**
   * Hoisted tags that extracted by hoistTagsPlugin
   */
  hoistedTags?: string[]

  /**
   * Imported file that extracted by importCodePlugin
   */
  importedFiles?: string[]

  /**
   * Links that extracted by linksPlugin
   */
  links?: MarkdownLink[]

  /**
   * Title that extracted by extractTitlePlugin
   */
  title?: string
}

/**
 * Type of `slugify` function
 */
export type MarkdownSlugifyFunction = (str: string) => string
