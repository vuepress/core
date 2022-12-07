import type { Plugin } from '@vuepress/core'
import { getDirname, path } from '@vuepress/utils'
import type { ThemeData } from '../shared/index.js'
import { prepareThemeData } from './prepareThemeData.js'

const __dirname = getDirname(import.meta.url)

/**
 * Options of @vuepress/plugin-theme-data
 */
export interface ThemeDataPluginOptions {
  /**
   * Theme data to be used in client side
   */
  themeData: ThemeData
}

export const themeDataPlugin = ({
  themeData,
}: ThemeDataPluginOptions): Plugin => ({
  name: '@vuepress/plugin-theme-data',

  clientConfigFile: path.resolve(__dirname, '../client/config.js'),

  onPrepared: (app) => prepareThemeData(app, themeData),
})
