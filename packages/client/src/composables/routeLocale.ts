import { inject } from 'vue'
import type { InjectionKey, Ref } from 'vue'

/**
 * Route locale path
 */
export type RouteLocale = string

/**
 * Ref wrapper of `RouteLocale`
 */
export type RouteLocaleRef = Readonly<Ref<RouteLocale>>

/**
 * Injection key for page route locale path
 */
export const routeLocaleSymbol: InjectionKey<RouteLocaleRef> = Symbol(
  __VUEPRESS_DEV__ ? 'routeLocale' : ''
)

/**
 * Returns the ref of the route locale path of current page
 */
export const useRouteLocale = (): RouteLocaleRef => {
  const routeLocale = inject(routeLocaleSymbol)
  if (!routeLocale) {
    throw new Error('useRouteLocale() is called without provider.')
  }
  return routeLocale
}
