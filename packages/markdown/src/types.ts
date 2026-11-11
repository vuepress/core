import type { MarkdownSfcBlocks } from '@mdit-vue/plugin-sfc'
import type { PageFrontmatter, PageHeader } from '@vuepress/shared'
import type { Env, MarkdownIt, MarkdownItOptions } from 'markdown-it'

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

export interface MarkdownOptions extends MarkdownItOptions {
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

declare module 'markdown-it' {
  interface Env {
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
}

/**
 * The `env` object to be passed to markdown-it render function
 */
export interface MarkdownEnv extends Env {
  /**
   * Frontmatter of the markdown file
   */
  frontmatter?: PageFrontmatter
}

/**
 * Type of `slugify` function
 */
export type MarkdownSlugifyFunction = (str: string) => string
