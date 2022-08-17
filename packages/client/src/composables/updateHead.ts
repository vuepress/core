import { inject } from 'vue'
import type { InjectionKey } from 'vue'

/**
 * A util function to force update `<head>` of current page
 */
export type UpdateHead = () => void

/**
 * Injection key for `updateHead` util
 */
export const updateHeadSymbol: InjectionKey<UpdateHead> = Symbol(
  __VUEPRESS_DEV__ ? 'updateHead' : ''
)

/**
 * Returns the `updateHead` util
 */
export const useUpdateHead = (): UpdateHead => {
  const updateHead = inject(updateHeadSymbol)
  if (!updateHead) {
    throw new Error('useUpdateHead() is called without provider.')
  }
  return updateHead
}
