import type { PageFrontmatter } from '../types/index.js'

/**
 * Resolve page route meta
 */
export const resolvePageMeta = ({
  frontmatter,
}: {
  frontmatter: PageFrontmatter
}): Record<string, unknown> => frontmatter.meta ?? {}
