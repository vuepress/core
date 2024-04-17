/**
 * Infer route path according to the given (markdown file) path
 */
export const inferRoutePath = (path: string): string => {
  // if the pathname is empty or ends with `/`, return as is
  if (!path || path.endsWith('/')) return path

  // convert README.md to index.html
  let routePath = path.replace(/(^|\/)README.md$/i, '$1index.html')

  // convert /foo/bar.md to /foo/bar.html
  if (routePath.endsWith('.md')) {
    routePath = routePath.substring(0, routePath.length - 3) + '.html'
  }
  // convert /foo/bar to /foo/bar.html
  else if (!routePath.endsWith('.html')) {
    routePath = routePath + '.html'
  }

  // convert /foo/index.html to /foo/
  if (routePath.endsWith('/index.html')) {
    routePath = routePath.substring(0, routePath.length - 10)
  }

  return routePath
}
