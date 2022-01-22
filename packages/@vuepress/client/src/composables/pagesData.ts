import { pagesData as pagesDataRaw } from '@internal/pagesData'
import type { PageData } from '@vuepress/shared'
import { ref } from 'vue'
import type { Ref } from 'vue'

/**
 * Data resolvers of all pages
 *
 * The key is page key, and the value is an async function that
 * returns the page data
 */
export type PagesData = Record<string, (() => Promise<PageData>) | undefined>

/**
 * Ref wrapper of `PagesData`
 */
export type PagesDataRef = Ref<PagesData>

/**
 * Global pages data ref
 */
export const pagesData: PagesDataRef = ref(pagesDataRaw)

/**
 * Returns the ref of data resolvers of all pages
 */
export const usePagesData = (): PagesDataRef => pagesData
