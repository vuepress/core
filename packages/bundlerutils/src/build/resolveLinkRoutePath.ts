import type { MarkdownLink } from '@vuepress/markdown'
import { inferRoutePath, normalizeRoutePath } from '@vuepress/shared'

/**
 * Normalize a MarkdownLink to a route path
 * that can be matched against Page.path.
 *
 * Returns null if the link is unresolvable.
 */
export const resolveLinkRoutePath = ({
  base,
  current,
  link,
}: {
  base: string
  current: string
  link: MarkdownLink
}): string | null => {
  if (!link.absolute) {
    return link.relative ? normalizeRoutePath(link.relative, current) : null
  }

  // Strip base prefix, ensuring leading slash
  const pathWithoutBase = link.absolute.startsWith(base)
    ? `/${link.absolute.slice(base.length)}`
    : link.absolute

  return inferRoutePath(pathWithoutBase)
}
