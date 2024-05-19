const SPLIT_CHAR_RE = /(#|\?)/

/**
 * Resolve the route.fullPath to  [pathname, queryAndHash]
 */
export const resolveRouteFullPath = (path: string): [string, string] => {
  const [pathname, ...queryAndHash] = path.split(SPLIT_CHAR_RE)

  return [pathname, queryAndHash.join('')]
}
