const HASH_REGEXP = /#.*$/u

/**
 * Normalize the given path to the final route path
 */
export const normalizeRoutePath = (
  path: string,
  preserveHash = true,
): string => {
  if (!path) {
    return path
  }

  const hash = preserveHash ? HASH_REGEXP.exec(path)?.[0] || '' : ''

  let routePath = path
    // remove hash
    .replace(HASH_REGEXP, '')
    // convert README.md to index.html
    .replace(/(^|\/)README.md$/i, '$1index.html')

  // convert /foo/bar.md to /foo/bar.html
  if (routePath.endsWith('.md')) {
    routePath = routePath.substring(0, routePath.length - 3) + '.html'
  }

  // convert /foo/bar to /foo/bar.html
  if (routePath && !routePath.endsWith('.html') && !routePath.endsWith('/')) {
    routePath = routePath + '.html'
  }

  // convert /foo/index.html to /foo/
  if (routePath.endsWith('/index.html')) {
    return routePath.substring(0, routePath.length - 10) + hash
  }

  return routePath + hash
}
