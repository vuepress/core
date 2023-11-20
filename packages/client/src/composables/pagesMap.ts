import { pagesMap as pagesMapRaw } from '@internal/pagesMap'
import type { PagesMap } from '@internal/pagesMap'
import { ref } from 'vue'
import type { Ref } from 'vue'

/**
 * Ref wrapper of `PagesMap`
 */
export type PagesMapRef = Ref<PagesMap>

/**
 * Global pages map ref
 */
export const pagesMap: PagesMapRef = ref(pagesMapRaw)

/**
 * Returns the ref of pages map
 */
export const usePagesMap = (): PagesMapRef => pagesMap
