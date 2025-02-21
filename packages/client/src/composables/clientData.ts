import type { InjectionKey } from 'vue'
import { inject } from 'vue'
import type { ClientData } from '../types/index.js'

/**
 * Injection key for client data
 */
export const clientDataSymbol: InjectionKey<ClientData> = Symbol(
  __VUEPRESS_DEV__ ? 'clientData' : '',
)

/**
 * Returns client data
 */
export const useClientData = <
  Frontmatter extends Record<string, unknown> = Record<string, unknown>,
  Data extends Record<string, unknown> = Record<string, unknown>,
>(): ClientData<Frontmatter, Data> => {
  const clientData = inject<ClientData<Frontmatter, Data>>(clientDataSymbol)
  if (!clientData) {
    throw new Error('useClientData() is called without provider.')
  }
  return clientData
}
