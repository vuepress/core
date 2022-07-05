import * as matter from 'gray-matter'
import type { PageFrontmatter } from '../types'

/**
 * Resolve page content and raw frontmatter & excerpt
 */
export const resolvePageContent = ({
  contentRaw,
}: {
  contentRaw: string
}): {
  content: string
  frontmatterRaw: PageFrontmatter
  excerptRaw: string
} => {
  if (!contentRaw) {
    return {
      content: '',
      frontmatterRaw: {},
      excerptRaw: '',
    }
  }

  /* istanbul ignore next */
  const {
    data,
    content,
    excerpt = '',
  } = matter(contentRaw, {
    excerpt_separator: '<!-- more -->',
  })

  return {
    content,
    frontmatterRaw: data,
    excerptRaw: excerpt,
  }
}
