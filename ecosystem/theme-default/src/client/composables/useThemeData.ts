import {
  useThemeData as _useThemeData,
  useThemeLocaleData as _useThemeLocaleData,
} from '@vuepress/plugin-theme-data/client'
import type {
  ThemeDataRef,
  ThemeLocaleDataRef,
} from '@vuepress/plugin-theme-data/client'
import type { DefaultThemeData } from '../../shared/index.js'

export const useThemeData = (): ThemeDataRef<DefaultThemeData> =>
  _useThemeData<DefaultThemeData>()
export const useThemeLocaleData = (): ThemeLocaleDataRef<DefaultThemeData> =>
  _useThemeLocaleData<DefaultThemeData>()
