import { inferRouteKey } from './inferRouteKey.js'

const FAKE_HOST = 'http://.'

/**
 * Normalize the given pathname path to the final route key
 */
export const normalizeRouteKey = (
  pathname: string,
  current?: string,
): string => {
  if (!pathname.startsWith('/') && current) {
    // the relative path should be resolved against the current path
    const loc = current.slice(0, current.lastIndexOf('/'))

    return inferRouteKey(new URL(`${loc}/${pathname}`, FAKE_HOST).pathname)
  }

  return inferRouteKey(pathname)
}
