import { redirects, routes } from '../router/index.js'

/**
 * Returns the ref of pages map
 */
export const useRedirects = (): typeof redirects => redirects

/**
 * Returns the ref of routes map
 */
export const useRoutes = (): typeof routes => routes
