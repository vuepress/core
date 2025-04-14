import type { InjectionKey } from 'vue'
import { inject } from 'vue'
import type { Data } from '../types/index.js'

/**
 * Injection key for vuepress data
 */
export const dataSymbol: InjectionKey<Data> = Symbol(
  __VUEPRESS_DEV__ ? 'data' : '',
)

/**
 * Returns VuePress data
 */
export const useData = <
  Frontmatter extends Record<string, unknown> = Record<string, unknown>,
  Page extends Record<string, unknown> = Record<string, unknown>,
>(): Data<Frontmatter, Page> => {
  const data = inject<Data<Frontmatter, Page>>(dataSymbol)
  if (!data) {
    throw new Error('useData() is called without provider.')
  }
  return data
}

// FIXME: remove this in stable

/** @deprecated using `useData` instead */
export const useClientData = useData
