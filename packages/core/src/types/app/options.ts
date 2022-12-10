import type { MarkdownOptions } from '@vuepress/markdown'
import type { SiteData } from '@vuepress/shared'
import type { Bundler } from '../bundler.js'
import type { PluginConfig } from '../plugin.js'
import type { Theme } from '../theme.js'

/**
 * Vuepress app common config that shared between dev and build
 */
export interface AppConfigCommon extends Partial<SiteData> {
  source: string
  dest?: string
  temp?: string
  cache?: string
  public?: string

  debug?: boolean
  markdown?: MarkdownOptions
  pagePatterns?: string[]
  permalinkPattern?: string | null
  bundler: Bundler
  theme: Theme
  plugins?: PluginConfig
}

/**
 * Vuepress app config for dev
 */
export interface AppConfigDev {
  /**
   * Specify the host to use for the dev server
   *
   * @default '0.0.0.0'
   */
  host?: string

  /**
   * Specify the port to use for the dev server
   *
   * @default 8080
   */
  port?: number

  /**
   * Whether to open the browser after dev-server had been started
   *
   * @default false
   */
  open?: boolean

  /**
   * Specify the path of the HTML template to be used for dev
   *
   * @default '@vuepress/client/templates/dev.html'
   */
  templateDev?: string
}

/**
 * Vuepress app config for build
 */
export interface AppConfigBuild {
  /**
   * Determine what resource files should be preloaded. Use boolean value to
   * totally enable / disable.
   *
   * @default true
   */
  shouldPreload?: ((file: string, type: string) => boolean) | boolean

  /**
   * Determine what resource files should be prefetched. Use boolean value to
   * totally enable / disable.
   *
   * @default true
   */
  shouldPrefetch?: ((file: string, type: string) => boolean) | boolean

  /**
   * Specify the path of the HTML template to be used for build
   *
   * @default '@vuepress/client/templates/build.html'
   */
  templateBuild?: string
}

/**
 * Vuepress app config
 */
export type AppConfig = AppConfigCommon & AppConfigDev & AppConfigBuild

/**
 * Vuepress app options
 */
export type AppOptions = Required<AppConfig>
