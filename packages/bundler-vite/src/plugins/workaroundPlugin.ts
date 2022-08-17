// import type { OptimizedDeps, Plugin, ViteDevServer } from 'vite'

// /**
//  * Workaround for https://github.com/vitejs/vite/issues/7621
//  */
// export const workaroundPlugin = (): Plugin => {
//   let server: (ViteDevServer & { _optimizedDeps?: OptimizedDeps }) | null
//   return {
//     name: 'vuepress:workaround',

//     enforce: 'pre',

//     apply: 'serve',

//     configureServer(_server) {
//       server = _server
//     },

//     resolveId() {
//       if (server?._optimizedDeps?.metadata.browserHash) {
//         server._optimizedDeps.metadata.hash = ''
//         server._optimizedDeps.metadata.browserHash = ''
//       }
//       return null
//     },
//   }
// }
