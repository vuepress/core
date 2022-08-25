import { ref } from 'vue'
import type { Ref } from 'vue'
import type { ThemeData } from '../../shared/index.js'

export type ThemeDataRef<T extends ThemeData = ThemeData> = Ref<T>

const themeDataRef: ThemeDataRef = ref({})

export const useThemeData = <
  T extends ThemeData = ThemeData
>(): ThemeDataRef<T> => themeDataRef as ThemeDataRef<T>

export const defineThemeData = <T extends ThemeData = ThemeData>(
  data: T
): void => {
  themeDataRef.value = data
}

if (__VUEPRESS_DEV__ && (import.meta.webpackHot || import.meta.hot)) {
  __VUE_HMR_RUNTIME__.updateThemeData = (data: ThemeData) => {
    themeDataRef.value = data
  }
}
