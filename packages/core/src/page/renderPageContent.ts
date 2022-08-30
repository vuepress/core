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
export const renderPageContent = async ({
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
}): Promise<{
  contentRendered: string
  deps: string[]
  excerpt: string
  frontmatter: PageFrontmatter
  headers: MarkdownHeader[]
  links: MarkdownLink[]
  sfcBlocks: MarkdownSfcBlocks
  title: string
}> => {
  const markdownEnv: MarkdownEnv = {
    base: app.options.base,
    filePath,
    filePathRelative,
    frontmatter: { ...options.frontmatter },
  }

  const contentRendered = app.markdown.render(content, markdownEnv)

  /* istanbul ignore next */
  const {
    excerpt = '',
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
  } = markdownEnv

  return {
    contentRendered,
    deps: importedFiles,
    excerpt,
    frontmatter,
    headers,
    links,
    sfcBlocks,
    title: frontmatter.title ?? title,
  }
}
