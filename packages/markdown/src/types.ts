import type { MarkdownSfcBlocks } from '@mdit-vue/plugin-sfc'
import type { MarkdownItEnv } from '@mdit-vue/types'
import type { PageFrontmatter, PageHeader } from '@vuepress/shared'
import type MarkdownIt from 'markdown-it'
import type { Options } from 'markdown-it'
import type {
  AnchorPluginOptions,
  AssetsPluginOptions,
  EmojiPluginOptions,
  FrontmatterPluginOptions,
  HeadersPluginOptions,
  ImportCodePluginOptions,
  LinksPluginOptions,
  SfcPluginOptions,
  TocPluginOptions,
  VPrePluginOptions,
} from './plugins.js'

export type Markdown = MarkdownIt
export type { MarkdownSfcBlocks }

export interface MarkdownOptions extends Options {
  anchor?: AnchorPluginOptions | false
  assets?: AssetsPluginOptions | false
  component?: false
  emoji?: EmojiPluginOptions | false
  frontmatter?: FrontmatterPluginOptions | false
  headers?: HeadersPluginOptions | false
  title?: false
  importCode?: ImportCodePluginOptions | false
  links?: LinksPluginOptions | false
  sfc?: SfcPluginOptions | false
  slugify?: MarkdownSlugifyFunction
  toc?: TocPluginOptions | false
  vPre?: VPrePluginOptions | false
  /**
   * @deprecated This feature has been removed. Please use `@vuepress/plugin-prismjs` or `@vuepress/plugin-shiki` instead.
   */
  code?: never
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
  absolute: string | null
}

/**
 * The `env` object to be passed to markdown-it render function
 *
 * Input some meta data for markdown file parsing and rendering
 *
 * Output some resources from the markdown file
 */
export interface MarkdownEnv extends MarkdownItEnv {
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
   * Imported file that extracted by importCodePlugin
   */
  importedFiles?: string[]

  /**
   * Links that extracted by linksPlugin
   */
  links?: MarkdownLink[]
}

/**
 * Type of `slugify` function
 */
export type MarkdownSlugifyFunction = (str: string) => string
