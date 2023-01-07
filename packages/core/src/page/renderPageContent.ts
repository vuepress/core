import type {
  MarkdownEnv,
  MarkdownHeader,
  MarkdownLink,
  MarkdownSfcBlocks,
} from '@vuepress/markdown'
import type { App, PageFrontmatter, PageOptions } from '../types/index.js'

/**
 * Render page content and extract related info
 */
export const renderPageContent = ({
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

    // values dropped from env

    // eslint-disable-next-line @typescript-eslint/naming-convention
    base: _base,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    content: _content,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    filePath: _filePath,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    filePathRelative: _filePathRelative,

    ...otherEnv
  } = markdownEnv

  return {
    contentRendered,
    deps: importedFiles,
    frontmatter,
    headers,
    links,
    markdownEnv: otherEnv,
    sfcBlocks,
    title: frontmatter.title ?? title,
  }
}
