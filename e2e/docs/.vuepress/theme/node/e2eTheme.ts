import type { Theme } from 'vuepress/core'
import { getDirname, path } from 'vuepress/utils'

const __dirname = getDirname(import.meta.url)

export const e2eTheme = (): Theme => ({
  name: '@vuepress/theme-e2e',

  alias: {
    // ...
  },

  define: {
    // ...
  },

  clientConfigFile: path.resolve(__dirname, '../client/config.ts'),

  extendsPage: () => {
    // ...
  },

  plugins: [],
})
