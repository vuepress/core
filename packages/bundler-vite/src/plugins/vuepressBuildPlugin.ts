import type { Plugin } from 'vite'

/**
 * Configure build command for vuepress
 */
export const vuepressBuildPlugin = ({
  isServer,
}: {
  isServer: boolean
}): Plugin => ({
  name: 'vuepress:build',

  generateBundle(_, bundle) {
    // delete all asset outputs in server build
    if (isServer) {
      Object.keys(bundle).forEach((key) => {
        if (bundle[key].type === 'asset') {
          delete bundle[key]
        }
      })
    }
  },
})
