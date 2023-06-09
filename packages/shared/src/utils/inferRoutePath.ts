// With large amount of routes, calling `router.resolve` can be
// expensive, so we now try to infer the final path to avoid meeting redirects
// that needs to resolve the route again
export const inferRoutePath = (path: string): string => {
  if (path.endsWith('.md')) path = `${path.slice(0, -3)}.html`
  if (!path.endsWith('/') && !path.endsWith('.html')) path = `${path}.html`
  path = path.replace(/(^|\/)(?:README|index).html$/i, '$1')

  return path
}
