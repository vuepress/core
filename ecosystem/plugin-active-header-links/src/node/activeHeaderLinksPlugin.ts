import type { Plugin } from '@vuepress/core'
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

/**
 * Options for @vuepress/plugin-active-header-links
 */
export interface ActiveHeaderLinksPluginOptions {
  /**
   * Selector of header link
   *
   * If a header anchor does not have a corresponding header link,
   * this plugin won't change the route hash to that anchor when
   * scrolling to it.
   *
   * @default 'a.sidebar-item'
   */
  headerLinkSelector?: string

  /**
   * Selector of header anchor
   *
   * @default '.header-anchor'
   */
  headerAnchorSelector?: string

  /**
   * The delay of the debounced scroll event listener (in millisecond)
   *
   * @default 200
   */
  delay?: number

  /**
   * Pixel offset when a header anchor to be determined as active
   *
   * @default 5
   */
  offset?: number
}

export const activeHeaderLinksPlugin = ({
  headerLinkSelector = 'a.sidebar-item',
  headerAnchorSelector = '.header-anchor',
  delay = 200,
  offset = 5,
}: ActiveHeaderLinksPluginOptions = {}): Plugin => ({
  name: '@vuepress/plugin-active-header-links',

  clientConfigFile: path.resolve(__dirname, '../client/config.js'),

  define: {
    __AHL_HEADER_LINK_SELECTOR__: headerLinkSelector,
    __AHL_HEADER_ANCHOR_SELECTOR__: headerAnchorSelector,
    __AHL_DELAY__: delay,
    __AHL_OFFSET__: offset,
  },
})
