import { isFunction } from '@vuepress/shared'
import type { AliasDefineHook } from '../types/index.js'

/**
 * Normalize alias and define hook
 */
export const normalizeAliasDefineHook =
  (hook: AliasDefineHook['exposed']): AliasDefineHook['normalized'] =>
  async (app, isServer) =>
    isFunction(hook) ? hook(app, isServer) : hook
