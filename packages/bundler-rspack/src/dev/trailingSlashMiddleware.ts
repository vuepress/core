import type { NextHandleFunction } from 'connect-next'

const FAKE_HOST = 'http://.'

/**
 * A middleware to add trailing slash to the url
 *
 * It will redirect '/foo' to '/foo/' with 302
 */
export const trailingSlashMiddleware: NextHandleFunction = (req, res, next) => {
  if (
    !req.method ||
    !req.url ||
    // only add trailing slash in GET and HEAD requests
    !['GET', 'HEAD'].includes(req.method)
  ) {
    next()
    return
  }

  const { pathname } = new URL(req.url, FAKE_HOST)

  if (
    // if the last section of the path has a dot, we think it has extension
    // and should not add trailing slash
    pathname.split('/').pop()?.includes('.') ||
    // if the path already has trailing slash
    pathname.endsWith('/')
  ) {
    next()
    return
  }

  // add trailing slash and retain query
  // notice that we should not use 301 in dev-server
  const query = req.url.slice(pathname.length)

  res.statusCode = 302
  res.setHeader('Location', `${pathname}/${query}`)
  res.end()
}
