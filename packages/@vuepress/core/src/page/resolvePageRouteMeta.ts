import type { PageFrontmatter } from '../types'

/**
 * Resolve page route meta
 */
export const resolvePageRouteMeta = ({
  frontmatter,
}: {
  frontmatter: PageFrontmatter
}): Record<string, unknown> => frontmatter.routeMeta ?? {}
