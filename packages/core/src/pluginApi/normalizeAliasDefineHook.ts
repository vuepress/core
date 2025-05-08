import { isFunction } from '@vuepress/shared'
import type { AliasHook, DefineHook } from '../types/index.js'

/**
 * Normalize alias and define hook
 *
 * @internal
 */
export const normalizeAliasDefineHook =
  <T extends AliasHook | DefineHook>(hook: T['exposed']): T['normalized'] =>
  async (app, isServer) =>
    isFunction(hook) ? hook(app, isServer) : hook
