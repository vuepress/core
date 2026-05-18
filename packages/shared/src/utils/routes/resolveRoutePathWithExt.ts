export const resolveRoutePathWithExt = (routePath: string): string =>
  routePath.endsWith('/') ? routePath : `${routePath}.html`
