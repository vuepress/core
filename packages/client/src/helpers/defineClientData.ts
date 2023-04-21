import type { InjectionKey } from 'vue'

export const clientDataMap = new Map<InjectionKey<unknown>, unknown>()

/**
 * A helper function to help you define vuepress client data
 */
export const defineClientData = <T = unknown>(
  key: InjectionKey<T>,
  data: T
): void => {
  clientDataMap.set(key, data)
}
