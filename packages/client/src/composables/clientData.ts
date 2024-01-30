import { inject } from 'vue'
import type { InjectionKey } from 'vue'

export const useClientData = <T = unknown, U extends boolean = false>(
  key: InjectionKey<T>,
  required?: U,
): U extends true ? T : T | undefined => {
  const result = inject(key)

  if (required && !result) {
    throw new Error(`Can not found ${key} in clientData()`)
  }

  return result as U extends true ? T : T | undefined
}
