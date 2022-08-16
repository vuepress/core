import { defineClientConfig, withBase } from '@vuepress/client'
import mitt from 'mitt'
import { onMounted, provide } from 'vue'
import { pwaEventSymbol } from './composables/index.js'
import type { PwaEvent } from './composables/index.js'

declare const __PWA_SW_FILENAME__: string

const swFilename = __PWA_SW_FILENAME__

export default defineClientConfig({
  setup() {
    if (__VUEPRESS_SSR__ || !swFilename) return

    const log = (...args: any[]): void =>
      console.log('[@vuepress/plugin-pwa]', ...args)

    // create event emitter and provide it
    const event: PwaEvent = mitt()
    provide(pwaEventSymbol, event)

    onMounted(async () => {
      // lazy load register-service-worker
      const { register } = await import('register-service-worker')

      // Register service worker
      register(withBase(swFilename), {
        ready(registration) {
          log('Service worker is active.')
          event.emit('ready', registration)
        },

        registered(registration) {
          log('Service worker has been registered.')
          event.emit('registered', registration)
        },

        cached(registration) {
          log('Content has been cached for offline use.')
          event.emit('cached', registration)
        },

        updatefound(registration) {
          log('New content is downloading.')
          event.emit('updatefound', registration)
        },

        updated(registration) {
          log('New content is available, please refresh.')
          event.emit('updated', registration)
        },

        offline() {
          log('No internet connection found. App is running in offline mode.')
          event.emit('offline')
        },

        error(err) {
          log('Error during service worker registration:', err)
          event.emit('error', err)
        },
      })
    })
  },
})
