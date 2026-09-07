import type { InjectionKey } from 'vue'
import { inject } from 'vue'

import type { ClientData } from '../types/index.js'

const CLIENT_DATA_SYMBOL_GLOBAL_KEY = '__VUEPRESS_CLIENT_DATA_SYMBOL__'

/**
 * Injection key for client data
 *
 * Use a global Symbol to keep the same reference across module reloads.
 * This is required for HMR in dev mode: when a markdown page with local
 * components is edited, the main module (and its transitive deps that host
 * this symbol) may be re-executed by Vite, which would otherwise create a
 * new Symbol instance and break `inject` (see vuepress/core#1715).
 */
const resolveClientDataSymbol = (): InjectionKey<ClientData> => {
  globalThis[CLIENT_DATA_SYMBOL_GLOBAL_KEY] ??= Symbol('clientData')
  return globalThis[CLIENT_DATA_SYMBOL_GLOBAL_KEY] as InjectionKey<ClientData>
}

/**
 * The problem only occurs during hot updates in the development environment,
 * It only needs to be processed in the development environment.
 * (see vuepress/core#1715)
 */
export const clientDataSymbol: InjectionKey<ClientData> = __VUEPRESS_DEV__
  ? resolveClientDataSymbol()
  : Symbol('')

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
