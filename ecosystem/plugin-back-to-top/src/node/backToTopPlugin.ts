import type { Plugin } from '@vuepress/core'
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

export const backToTopPlugin = (): Plugin => ({
  name: '@vuepress/plugin-back-to-top',

  clientConfigFile: path.resolve(__dirname, '../client/config.js'),

  alias: {
    // workaround for https://github.com/vitejs/vite/issues/7621
    '@vuepress/plugin-back-to-top/client': path.resolve(
      __dirname,
      '../client/index.js'
    ),
  },
})
