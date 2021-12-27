import type { MarkdownOptions } from '@vuepress/markdown'
import type { SiteData } from '@vuepress/shared'
import type { BundlerConfig } from '../bundler'
import type { PluginConfig } from '../plugin'
import type { ThemeConfig } from '../theme'

/**
 * Config to create vuepress app
 */
export type AppConfig<
  T extends ThemeConfig = ThemeConfig,
  U extends BundlerConfig = BundlerConfig
> = Partial<SiteData> &
  AppConfigDev &
  AppConfigBuild & {
    theme?: string
    themeConfig?: Partial<T>
    bundler?: string
    bundlerConfig?: Partial<U>

    source: string
    dest?: string
    temp?: string
    cache?: string
    public?: string

    debug?: boolean
    pagePatterns?: string[]

    markdown?: MarkdownOptions
    plugins?: PluginConfig[]
  }

/**
 * Vuepress app config for dev
 */
export interface AppConfigDev {
  host?: string
  port?: number
  open?: boolean
  templateDev?: string
}

/**
 * Vuepress app config for build
 */
export interface AppConfigBuild {
  shouldPreload?: ((file: string, type: string) => boolean) | boolean
  shouldPrefetch?: ((file: string, type: string) => boolean) | boolean
  templateBuild?: string
}

/**
 * Vuepress app options
 */
export type AppOptions<
  T extends ThemeConfig = ThemeConfig,
  U extends BundlerConfig = BundlerConfig
> = Required<AppConfig<T, U>>
