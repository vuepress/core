const SPLIT_CHAR_REGEXP = /(#|\?)/

/**
 * Extract pathname / hash and queries from a full route path
 */
export const resolveRoutePathInfo = (
  path: string,
): [pathname: string, hashAndQueries: string] => {
  const [pathname, ...hashAndQueries] = path.split(SPLIT_CHAR_REGEXP)

  return [pathname, hashAndQueries.join('')]
}
