import type { OptimizedDeps, Plugin, ViteDevServer } from 'vite'

/**
 * Vite will inject version hash into file queries, which does not work
 * well with VuePress.
 *
 * As a workaround, we remove the version hash to avoid the injection.
 */
export const createWorkaroundPlugin = (): Plugin => {
  let server: (ViteDevServer & { _optimizedDeps?: OptimizedDeps }) | null
  return {
    name: 'vuepress:workaround',

    enforce: 'pre',

    configureServer(_server) {
      server = _server
    },

    resolveId() {
      if (server?._optimizedDeps?.metadata.browserHash) {
        server._optimizedDeps.metadata.browserHash = ''
      }
      return null
    },
  }
}
