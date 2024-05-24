/**
 * Resolve the final route path of a page
 */
export const resolvePageRouteKey = (path: string): string =>
  // convert to the clean format
  path.replace(/\.html$/, '').replace(/\/index$/i, '/')
