import type { Page, Theme } from '@vuepress/core'
import { activeHeaderLinksPlugin } from '@vuepress/plugin-active-header-links'
import { backToTopPlugin } from '@vuepress/plugin-back-to-top'
import { containerPlugin } from '@vuepress/plugin-container'
import { externalLinkIconPlugin } from '@vuepress/plugin-external-link-icon'
import { gitPlugin } from '@vuepress/plugin-git'
import { mediumZoomPlugin } from '@vuepress/plugin-medium-zoom'
import { nprogressPlugin } from '@vuepress/plugin-nprogress'
import { palettePlugin } from '@vuepress/plugin-palette'
import { prismjsPlugin } from '@vuepress/plugin-prismjs'
import { themeDataPlugin } from '@vuepress/plugin-theme-data'
import { fs, getDirname, path } from '@vuepress/utils'
import type { DefaultThemePageData } from '../shared/index.js'

const __dirname = getDirname(import.meta.url)

export interface DefaultThemeOptions {
  /**
   * To avoid confusion with the root `plugins` option,
   * we use `themePlugins`
   */
  themePlugins?: {
    /**
     * Enable @vuepress/plugin-active-header-links or not
     */
    activeHeaderLinks?: boolean

    /**
     * Enable @vuepress/plugin-back-to-top or not
     */
    backToTop?: boolean

    /**
     * Enable @vuepress/plugin-container or not
     */
    container?: {
      tip?: boolean
      warning?: boolean
      danger?: boolean
      details?: boolean
      codeGroup?: boolean
      codeGroupItem?: boolean
    }

    /**
     * Enable @vuepress/plugin-external-link-icon or not
     */
    externalLinkIcon?: boolean

    /**
     * Enable @vuepress/plugin-git or not
     */
    git?: boolean

    /**
     * Enable @vuepress/plugin-medium-zoom or not
     */
    mediumZoom?: boolean

    /**
     * Enable @vuepress/plugin-nprogress or not
     */
    nprogress?: boolean

    /**
     * Enable @vuepress/plugin-prismjs or not
     */
    prismjs?: boolean
  }
}

export const defaultTheme = ({
  themePlugins = {},
}: DefaultThemeOptions = {}): Theme => {
  return {
    name: '@vuepress/theme-default',

    templateBuild: path.resolve(__dirname, '../../templates/build.html'),

    alias: {
      // use alias to make all components replaceable
      ...Object.fromEntries(
        fs
          .readdirSync(path.resolve(__dirname, '../client/components'))
          .filter((file) => file.endsWith('.vue'))
          .map((file) => [
            `@theme/${file}`,
            path.resolve(__dirname, '../client/components', file),
          ])
      ),
    },

    clientConfigFile: path.resolve(__dirname, '../client/config.js'),

    extendsPage: (page: Page<Partial<DefaultThemePageData>>) => {
      // save relative file path into page data to generate edit link
      page.data.filePathRelative = page.filePathRelative
      // save title into route meta to generate navbar and sidebar
      page.routeMeta.title = page.title
    },

    plugins: [
      // @vuepress/plugin-active-header-link
      themePlugins.activeHeaderLinks !== false
        ? activeHeaderLinksPlugin({
            headerLinkSelector: 'a.sidebar-item',
            headerAnchorSelector: '.header-anchor',
            // should greater than page transition duration
            delay: 300,
          })
        : [],

      // @vuepress/plugin-back-to-top
      themePlugins.backToTop !== false ? backToTopPlugin() : [],

      // @vuepress/plugin-container
      themePlugins.container?.tip !== false
        ? containerPlugin({
            type: 'tip',
            locales: {
              '/': {
                defaultInfo: '{{ $themeLocale.tip }}',
              },
            },
          })
        : [],
      themePlugins.container?.warning !== false
        ? containerPlugin({
            type: 'warning',
            locales: {
              '/': {
                defaultInfo: '{{ $themeLocale.warning }}',
              },
            },
          })
        : [],
      themePlugins.container?.danger !== false
        ? containerPlugin({
            type: 'danger',
            locales: {
              '/': {
                defaultInfo: '{{ $themeLocale.danger }}',
              },
            },
          })
        : [],
      themePlugins.container?.details !== false
        ? containerPlugin({
            type: 'details',
            before: (info) =>
              `<details class="custom-container details">${
                info ? `<summary>${info}</summary>` : ''
              }\n`,
            after: () => '</details>\n',
          })
        : [],
      themePlugins.container?.codeGroup !== false
        ? containerPlugin({
            type: 'code-group',
            before: () => `<CodeGroup>\n`,
            after: () => '</CodeGroup>\n',
          })
        : [],
      themePlugins.container?.codeGroupItem !== false
        ? containerPlugin({
            type: 'code-group-item',
            before: (info) => `<CodeGroupItem title="${info}">\n`,
            after: () => '</CodeGroupItem>\n',
          })
        : [],

      // @vuepress/plugin-external-link-icon
      themePlugins.externalLinkIcon !== false
        ? externalLinkIconPlugin({
            locales: {
              '/': {
                openInNewWindow: '{{ $themeLocale.openInNewWindow }}',
              },
            },
          })
        : [],

      // @vuepress/plugin-git
      themePlugins.git !== false
        ? gitPlugin({
            createdTime: false,
            updatedTime: true,
            contributors: true,
          })
        : [],

      // @vuepress/plugin-medium-zoom
      themePlugins.mediumZoom !== false
        ? mediumZoomPlugin({
            selector:
              '.theme-default-content > img, .theme-default-content :not(a) > img',
            zoomOptions: {},
            // should greater than page transition duration
            delay: 300,
          })
        : [],

      // @vuepress/plugin-nprogress
      themePlugins.nprogress !== false ? nprogressPlugin() : [],

      // @vuepress/plugin-palette
      palettePlugin({ preset: 'sass' }),

      // @vuepress/plugin-prismjs
      themePlugins.prismjs !== false ? prismjsPlugin() : [],

      // @vuepress/plugin-theme-data
      themeDataPlugin(),
    ],
  }
}
