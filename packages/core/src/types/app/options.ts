import type { MarkdownOptions } from '@vuepress/markdown'
import type { SiteData } from '@vuepress/shared'
import type { TemplateRenderer } from '@vuepress/utils'
import type { Bundler } from '../bundler.js'
import type { PluginConfig } from '../plugin.js'
import type { Theme } from '../theme.js'

/**
 * Vuepress app common config that shared between dev and build
 */
export interface AppConfigCommon extends Partial<SiteData> {
  /**
   * Source directory of the markdown files.
   *
   * Vuepress will load markdown files from this directory.
   *
   * @required
   */
  source: string

  /**
   * Destination directory of the output files.
   *
   * Vuepress will output the static site files to this directory.
   *
   * @default `${source}/.vuepress/dist`
   */
  dest?: string

  /**
   * Temp files directory.
   *
   * Vuepress will write temp files to this directory.
   *
   * @default `${source}/.vuepress/.temp`
   */
  temp?: string

  /**
   * Cache files directory.
   *
   * Vuepress will write cache files to this directory.
   *
   * @default `${source}/.vuepress/.cache`
   */
  cache?: string

  /**
   * Public files directory.
   *
   * Vuepress will copy the files from public directory to the output directory.
   *
   * @default `${source}/.vuepress/public`
   */
  public?: string

  /**
   * Whether to enable debug mode
   *
   * @default false
   */
  debug?: boolean

  /**
   * Markdown options
   *
   * @default {}
   */
  markdown?: MarkdownOptions

  /**
   * Patterns to match the markdown files as pages
   *
   * @default ['**\/*.md', '!.vuepress', '!node_modules']
   */
  pagePatterns?: string[]

  /**
   * Pattern to generate permalink for pages
   *
   * @default null
   */
  permalinkPattern?: string | null

  /**
   * Vuepress bundler
   *
   * @required
   */
  bundler: Bundler

  /**
   * Vuepress theme
   *
   * @required
   */
  theme: Theme

  /**
   * Vuepress plugins
   *
   * @default []
   */
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
  shouldPreload?: boolean | ((file: string, type: string) => boolean)

  /**
   * Determine what resource files should be prefetched. Use boolean value to
   * totally enable / disable.
   *
   * @default true
   */
  shouldPrefetch?: boolean | ((file: string, type: string) => boolean)

  /**
   * Specify the path of the HTML template to be used for build
   *
   * @default '@vuepress/client/templates/build.html'
   */
  templateBuild?: string

  /**
   * Specify the HTML template renderer to be used for build
   *
   * @default `import { templateRenderer } from '@vuepress/utils'`
   */
  templateBuildRenderer?: TemplateRenderer
}

/**
 * Vuepress app user config.
 *
 * It would be provided by user, typically via a config file.
 */
export type AppConfig = AppConfigBuild & AppConfigCommon & AppConfigDev

/**
 * Vuepress app options that resolved from user config.
 *
 * It fills all optional fields with a default value.
 */
export type AppOptions = Required<AppConfig>
