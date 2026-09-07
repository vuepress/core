/**
 * Resolve the actual route path of a page in the current mode
 *
 * It is the canonical route key with the `.html` suffix appended, unless
 * `cleanUrl` is enabled or the route key already ends with a trailing slash.
 *
 * @internal
 */
export const resolvePagePath = ({
  routeKey,
  cleanUrl,
}: {
  routeKey: string
  cleanUrl: boolean
}): string =>
  cleanUrl || routeKey.endsWith('/') ? routeKey : `${routeKey}.html`
