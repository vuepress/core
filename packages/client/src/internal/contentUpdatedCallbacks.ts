import type { Ref } from 'vue'
import { shallowRef } from 'vue'
import type { ContentUpdatedCallback } from '../types/index.js'

/**
 * Global content updated callbacks ref
 */
export const contentUpdatedCallbacks: Ref<ContentUpdatedCallback[]> =
  shallowRef([])
