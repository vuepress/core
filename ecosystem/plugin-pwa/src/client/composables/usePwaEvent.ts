import type { Emitter } from 'mitt'
import { inject } from 'vue'
import type { InjectionKey } from 'vue'

export type PwaEvent = Emitter<{
  ready: ServiceWorkerRegistration
  registered: ServiceWorkerRegistration
  cached: ServiceWorkerRegistration
  updatefound: ServiceWorkerRegistration
  updated: ServiceWorkerRegistration
  offline: void
  error: Error
}>

export const pwaEventSymbol: InjectionKey<PwaEvent> = Symbol('pwaEvent')

export const usePwaEvent = (): PwaEvent => {
  const pwaEvent = inject(pwaEventSymbol)
  if (!pwaEvent) {
    throw new Error('usePwaEvent() is called without provider.')
  }
  return pwaEvent
}
