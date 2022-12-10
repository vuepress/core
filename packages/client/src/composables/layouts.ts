import { type ComputedRef, inject, type InjectionKey } from 'vue'
import type { Layouts } from '../types/index.js'

/**
 * Ref wrapper of `Layouts`
 */
export type LayoutsRef = ComputedRef<Layouts>

/**
 * Injection key for layouts
 */
export const layoutsSymbol: InjectionKey<LayoutsRef> = Symbol(
  __VUEPRESS_DEV__ ? 'layouts' : ''
)

/**
 * Returns layouts component map
 */
export const useLayouts = (): LayoutsRef => {
  const layouts = inject(layoutsSymbol)
  if (!layouts) {
    throw new Error('useLayouts() is called without provider.')
  }
  return layouts
}
