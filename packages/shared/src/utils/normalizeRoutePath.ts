/**
 * Normalize the given path to the final route path
 */
export const normalizeRoutePath = (path: string): string => {
  if (!path || path.endsWith('/')) {
    return path
  }

  // convert README.md to index.html
  let routePath = path.replace(/(^|\/)README.md$/i, '$1index.html')

  // convert /foo/bar.md to /foo/bar.html
  if (routePath.endsWith('.md')) {
    routePath = routePath.substring(0, routePath.length - 3) + '.html'
  }

  // convert /foo/bar to /foo/bar.html
  if (!routePath.endsWith('.html')) {
    routePath = routePath + '.html'
  }

  // convert /foo/index.html to /foo/
  if (routePath.endsWith('/index.html')) {
    return routePath.substring(0, routePath.length - 10)
  }

  return routePath
}
