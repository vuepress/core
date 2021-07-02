import type { Plugin, ViteDevServer, DepOptimizationMetadata } from 'vite'

/**
 * Workaround for https://github.com/vitejs/vite/issues/2503
 *
 * Although the issue was closed in vite 2.3.0, there are still
 * some problems with the version hash
 */
export const createWorkaroundPlugin = (): Plugin => {
  let server:
    | (ViteDevServer & { _optimizeDepsMetadata?: DepOptimizationMetadata })
    | null
  return {
    name: 'vuepress:workaround',

    enforce: 'pre',

    configureServer(_server) {
      server = _server
    },

    resolveId() {
      if (server?._optimizeDepsMetadata?.browserHash) {
        server._optimizeDepsMetadata.browserHash = ''
      }
      return null
    },
  }
}
