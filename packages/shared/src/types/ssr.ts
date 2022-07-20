import type { HeadConfig } from './head.js'

/**
 * Context for SSR
 */
export interface VuepressSSRContext {
  lang: string
  head: HeadConfig[]
}
