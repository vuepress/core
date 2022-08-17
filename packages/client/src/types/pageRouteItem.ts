import type { RouteMeta } from 'vue-router'

export type PageRouteItem = [
  name: string,
  path: string,
  meta: RouteMeta,
  redirects: string[]
]
