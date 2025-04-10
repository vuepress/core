/**
 * Infer route path of the given raw path
 */
export const inferRoutePath = (rawPath: string): string => {
  // if the raw path is empty or ends with `/`, return as is
  if (!rawPath || rawPath.endsWith('/')) return rawPath

  // convert README.md to index.html
  let routePath = rawPath.replace(/(^|\/)README.md$/i, '$1index')

  // convert /foo/bar.md to /foo/bar
  if (routePath.endsWith('.md')) {
    routePath = routePath.substring(0, routePath.length - 3)
  }
  // convert /foo/bar.html to /foo/bar
  else if (routePath.endsWith('.html')) {
    routePath = routePath.substring(0, routePath.length - 5)
  }

  // convert /foo/index to /foo/
  if (routePath.endsWith('/index')) {
    routePath = routePath.substring(0, routePath.length - 5)
  }

  return routePath
}
