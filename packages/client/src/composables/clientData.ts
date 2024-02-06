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
export const useClientData = (): ClientData => {
  const clientData = inject(clientDataSymbol)
  if (!clientData) {
    throw new Error('useClientData() is called without provider.')
  }
  return clientData
}
