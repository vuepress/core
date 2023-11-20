import type { PageFrontmatter } from '../types/index.js'

/**
 * Resolve page route meta
 */
export const resolvePageMeta = ({
  frontmatter,
}: {
  frontmatter: PageFrontmatter
}): Record<string, unknown> => {
  // TODO: Added for backwards compatibility, should be removed in stable
  if (frontmatter.routeMeta)
    frontmatter.meta = { ...frontmatter.routeMeta, ...frontmatter.meta }

  return frontmatter.meta ?? {}
}
