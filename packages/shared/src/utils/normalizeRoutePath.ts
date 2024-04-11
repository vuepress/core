const FAKE_HOST = 'http://.'

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

/**
 * Normalize the given path to the final route path
 */
export const normalizeRoutePath = (path: string, current?: string): string => {
  if (!path.startsWith('/') && current) {
    // the relative path should be resolved against the current path
    const loc = current.slice(0, current.lastIndexOf('/'))

    const { pathname, search, hash } = new URL(`${loc}/${path}`, FAKE_HOST)

    return inferRoutePath(pathname) + search + hash
  }

  const [pathname, ...queryAndHash] = path.split(/(\?|#)/)

  return inferRoutePath(pathname) + queryAndHash.join('')
}
