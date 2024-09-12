import type {
  MarkdownEnv,
  MarkdownHeader,
  MarkdownLink,
  MarkdownSfcBlocks,
} from '@vuepress/markdown'
import { omit } from '@vuepress/shared'
import type { App, PageFrontmatter, PageOptions } from '../types/index.js'

/**
 * Render page content and extract related info
 *
 * @internal
 */
export const parsePageContent = ({
  app,
  content,
  filePath,
  filePathRelative,
  options,
}: {
  app: App
  content: string
  filePath: string | null
  filePathRelative: string | null
  options: PageOptions
}): {
  contentRendered: string
  deps: string[]
  markdownEnv: Record<string, unknown>
  frontmatter: PageFrontmatter
  headers: MarkdownHeader[]
  links: MarkdownLink[]
  sfcBlocks: MarkdownSfcBlocks
  title: string
} => {
  const markdownEnv: MarkdownEnv = {
    base: app.options.base,
    filePath,
    filePathRelative,
    frontmatter: { ...options.frontmatter },
  }

  const contentRendered = app.markdown.render(content, markdownEnv)

  /* istanbul ignore next */
  const {
    frontmatter = {},
    headers = [],
    importedFiles = [],
    links = [],
    sfcBlocks = {
      template: null,
      script: null,
      scriptSetup: null,
      scripts: [],
      styles: [],
      customBlocks: [],
    },
    title = '',
    ...extraMarkdownEnv
  } = markdownEnv

  return {
    contentRendered,
    deps: importedFiles,
    frontmatter,
    headers,
    links,
    markdownEnv: omit(
      extraMarkdownEnv,
      'base',
      'content',
      'filePath',
      'filePathRelative',
      'frontmatter',
    ),
    sfcBlocks,
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-template-expression -- the title from frontmatter is not guaranteed to be a string
    title: frontmatter.title ? `${frontmatter.title}` : title,
  }
}
