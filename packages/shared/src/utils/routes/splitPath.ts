const SPLIT_CHAR_REGEXP = /(#|\?)/

/**
 * Split a path into pathname and hashAndQueries
 */
export const splitPath = (
  path: string,
): {
  pathname: string
  hashAndQueries: string
} => {
  const [pathname, ...hashAndQueries] = path.split(SPLIT_CHAR_REGEXP)
  return {
    pathname,
    hashAndQueries: hashAndQueries.join(''),
  }
}
