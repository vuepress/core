import type { PageFrontmatter } from '../types/index.js'

/**
 * Resolve page route meta
 */
export const resolvePageRouteMeta = ({
  frontmatter,
}: {
  frontmatter: PageFrontmatter
}): Record<string, unknown> => frontmatter.routeMeta ?? {}
