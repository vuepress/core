/**
 * Infer route path of the given raw path
 */
export const inferRoutePath = (rawPath: string): string => {
  // if the raw path is empty or ends with `/`, return as is
  if (!rawPath || rawPath.endsWith('/')) return rawPath

  // convert README.md to index.html
  let routePath = rawPath.replace(/(^|\/)README.md$/i, '$1index.html')

  // convert /foo/bar.md to /foo/bar.html
  // the markdown extension is matched case-insensitively, e.g. `/foo/bar.MD`
  if (/\.md$/i.test(routePath)) {
    routePath = `${routePath.substring(0, routePath.length - 3)}.html`
  }
  // convert /foo/bar to /foo/bar.html
  else if (!routePath.endsWith('.html')) {
    routePath = `${routePath}.html`
  }

  // convert /foo/index.html to /foo/
  if (routePath.endsWith('/index.html')) {
    routePath = routePath.substring(0, routePath.length - 10)
  }

  return routePath
}
