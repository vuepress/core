import type { Plugin } from '@vuepress/core'
import { getDirname, path } from '@vuepress/utils'
import type { DocsearchOptions } from '../shared/index.js'

const __dirname = getDirname(import.meta.url)

export interface DocsearchPluginOptions extends DocsearchOptions {
  indexBase?: string
  injectStyles?: boolean
}

export const docsearchPlugin = ({
  injectStyles = true,
  indexBase = '',
  ...options
}: DocsearchPluginOptions): Plugin => ({
  name: '@vuepress/plugin-docsearch',

  clientConfigFile: path.resolve(__dirname, '../client/config.js'),

  define: (app) => ({
    __DOCSEARCH_OPTIONS__: options,
    __DOCSEARCH_INJECT_STYLES__: injectStyles,
    __DOCSEARCH_INDEX_BASE__: indexBase || app.options.base,
  }),
})
