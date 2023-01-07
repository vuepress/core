import { resolveRouteWithRedirect } from '@vuepress/helper/client'
import { useRouter } from 'vue-router'
import type { Router } from 'vue-router'

/**
 * Resolve a route with redirection
 */
export const useResolveRouteWithRedirect = (
  ...args: Parameters<Router['resolve']>
): ReturnType<Router['resolve']> => {
  const router = useRouter()

  return resolveRouteWithRedirect(router, ...args)
}
