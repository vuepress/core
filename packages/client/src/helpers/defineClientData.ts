import type { InjectionKey } from 'vue'

export const clientDataMap = new Map<InjectionKey<unknown>, unknown>()

/**
 * A helper function to help you define vuepress client data
 */
export const defineClientData = <T = unknown>(
  key: InjectionKey<T>,
  data: T,
  overrideExisting = true,
): void => {
  if (overrideExisting || !clientDataMap.has(key)) clientDataMap.set(key, data)
}
