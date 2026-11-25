/**
 * Decode the given route path
 *
 * It falls back to the original route path if it contains malformed URI
 * sequences, e.g. `/100%.html`, because `decodeURI` would throw an
 * `URIError` and break the rendering of the 404 page.
 */
export const decodeRoutePath = (routePath: string): string => {
  try {
    return decodeURI(routePath)
  } catch {
    return routePath
  }
}
