import { pagesMap, redirectsMap } from '../router'

/**
 * Returns the ref of pages map
 */
export const usePagesMap = (): typeof pagesMap => pagesMap

/**
 * Returns the ref of pages map
 */
export const useRedirectsMap = (): typeof redirectsMap => redirectsMap
