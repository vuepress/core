import type { ContentUpdatedCallback } from '../types/index.js'

/**
 * Global content updated callbacks
 */
export const contentUpdatedCallbacks = new Set<ContentUpdatedCallback>()
