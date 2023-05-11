import type { RouteLocale } from '@vuepress/client'
import { inject } from 'vue'
import type { ComputedRef, InjectionKey } from 'vue'
import type { ThemeData } from '../../shared/index.js'

export type ThemeLocaleDataRef<T extends ThemeData = ThemeData> = ComputedRef<T>

export const themeLocaleDataSymbol: InjectionKey<ThemeLocaleDataRef> = Symbol(
  __VUEPRESS_DEV__ ? 'themeLocaleData' : ''
)

export const useThemeLocaleData = <
  T extends ThemeData = ThemeData
>(): ThemeLocaleDataRef<T> => {
  const themeLocaleData = inject(themeLocaleDataSymbol)
  if (!themeLocaleData) {
    throw new Error('useThemeLocaleData() is called without provider.')
  }
  return themeLocaleData as ThemeLocaleDataRef<T>
}

/**
 * Merge the locales fields to the root fields
 * according to the route path
 */
export const resolveThemeLocaleData = (
  theme: ThemeData,
  routeLocale: RouteLocale
): ThemeData => {
  const { locales, ...baseOptions } = theme

  return {
    ...baseOptions,
    ...locales?.[routeLocale],
  }
}
