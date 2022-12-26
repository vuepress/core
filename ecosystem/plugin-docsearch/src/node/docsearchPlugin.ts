import type { Plugin } from '@vuepress/core'
import { getDirname, path } from '@vuepress/utils'
import type { DocsearchOptions } from '../shared/index.js'

const __dirname = getDirname(import.meta.url)

export interface DocsearchPluginOptions extends DocsearchOptions {
  injectStyle?: boolean
}

export const docsearchPlugin = (options: DocsearchPluginOptions): Plugin => ({
  name: '@vuepress/plugin-docsearch',

  clientConfigFile: path.resolve(__dirname, '../client/config.js'),

  define: {
    __DOCSEARCH_OPTIONS__: options,
    __DOCSEARCH_INJECT_STYLE__: options.injectStyle ?? true,
  },
})
