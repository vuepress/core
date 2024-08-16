import type { Theme } from 'vuepress/core'
import { getDirname, path } from 'vuepress/utils'

const DIRNAME = getDirname(import.meta.url)

export const e2eTheme = (): Theme => ({
  name: '@vuepress/theme-e2e',

  alias: {
    // ...
  },

  define: {
    // ...
  },

  clientConfigFile: path.resolve(DIRNAME, '../client/config.ts'),

  extendsPage: () => {
    // ...
  },

  plugins: [],
})
