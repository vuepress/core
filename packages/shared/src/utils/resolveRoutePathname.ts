const SPLIT_CHAR_RE = /#|\?/

/**
 * Resolve the route pathname
 */
export const resolveRoutePathname = (path: string): string => {
  return path.split(SPLIT_CHAR_RE)[0]
}
