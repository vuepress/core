import type { MarkdownLink } from '@vuepress/markdown'
import { inferRouteKey, normalizeRouteKey } from '@vuepress/shared'

/**
 * Normalize a MarkdownLink to a route key
 * that can be matched against Page.path.
 *
 * Returns null if the link is unresolvable.
 */
export const resolveLinkRouteKey = ({
  base,
  current,
  link,
}: {
  base: string
  current: string
  link: MarkdownLink
}): string | null => {
  if (!link.absolute) {
    return link.relative ? normalizeRouteKey(link.relative, current) : null
  }

  // Strip base prefix, ensuring leading slash
  const pathWithoutBase = link.absolute.startsWith(base)
    ? `/${link.absolute.slice(base.length)}`
    : link.absolute

  return inferRouteKey(pathWithoutBase)
}
