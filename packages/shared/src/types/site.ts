import type { HeadConfig } from './head.js'
import type { LocaleConfig } from './locale.js'

/**
 * Vuepress site data
 */
export interface SiteData extends SiteLocaleData {
  /**
   * The base URL the site will be deployed at
   *
   * It should always start and end with a slash
   *
   * @default '/'
   */
  base: '/' | `/${string}/`

  /**
   * Specify locales for i18n support
   *
   * It will override the root-level site data in different subpath
   *
   * @example
   * {
   *   '/en/': {
   *     lang: 'en-US',
   *     title: 'Hello',
   *     description: 'This will take effect under /en/ subpath',
   *   },
   *   '/zh/': {
   *     lang: 'zh-CN',
   *     title: '你好',
   *     description: '它将会在 /zh/ 子路径下生效',
   *   }
   * }
   */
  locales: SiteLocaleConfig
}

/**
 * Locales data of vuepress site
 *
 * If they are set in the root of site data, they will be used
 * as the default value
 *
 * If they are set in the `locales` of site data, they will be
 * used for specific locale
 */
export interface SiteLocaleData {
  /**
   * Language for the site
   *
   * @default 'en-US'
   */
  lang: string

  /**
   * Title for the site
   *
   * @default ''
   */
  title: string

  /**
   * Description for the site
   *
   * @default ''
   */
  description: string

  /**
   * Head config
   *
   * Descibe the tags to be appended into the `<head>` tag
   *
   * @default []
   *
   * @example ['link', { rel: 'icon', href: '/logo.png' }]
   * @example ['style', { type: 'text/css' }, 'p { color: red; }']
   */
  head: HeadConfig[]
}

/**
 * Site locale config
 */
export type SiteLocaleConfig = LocaleConfig<SiteLocaleData>
