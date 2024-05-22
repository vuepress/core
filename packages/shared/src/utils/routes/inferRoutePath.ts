/**
 * Infer route path according to the given (markdown file) path
 */
export const inferRoutePath = (path: string): string => {
  // if the pathname is empty or ends with `/`, return as is
  if (!path || path.endsWith('/')) return path

  // convert README.md to index.html
  let routePath = path.replace(/(^|\/)README.md$/i, '$1index')

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
