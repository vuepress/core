import type { Plugin } from '@vuepress/core'
import { getDirname, path } from '@vuepress/utils'
import type { DocsearchOptions } from '../shared/index.js'

const __dirname = getDirname(import.meta.url)

export type DocsearchPluginOptions = DocsearchOptions

export const docsearchPlugin = (options: DocsearchPluginOptions): Plugin => ({
  name: '@vuepress/plugin-docsearch',

  clientConfigFile: path.resolve(__dirname, '../client/config.js'),

  alias: {
    // workaround for https://github.com/vitejs/vite/issues/7621
    '@vuepress/plugin-docsearch/client': path.resolve(
      __dirname,
      '../client/index.js'
    ),
  },

  define: {
    __DOCSEARCH_OPTIONS__: options,
  },
})
