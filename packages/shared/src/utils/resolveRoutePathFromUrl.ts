export const resolveRoutePathFromUrl = (url: string, base = '/'): string => {
  const pathname = url
    // remove url origin
    .replace(/^(https?:)?\/\/[^/]*/, '')

  return pathname.startsWith(base)
    ? `/${pathname.slice(base.length)}`
    : pathname
}
