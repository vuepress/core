import { inferRoutePath } from './inferRoutePath.js'

const FAKE_HOST = 'http://.'

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
