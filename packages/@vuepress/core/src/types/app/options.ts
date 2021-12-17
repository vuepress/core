import type { MarkdownOptions } from '@vuepress/markdown'
import type { SiteData } from '@vuepress/shared'
import type { BundlerConfig } from '../bundler'
import type { PluginConfig } from '../plugin'
import type { ThemeConfig } from '../theme'

/**
 * Vuepress app options
 */
export interface AppOptions<
  T extends ThemeConfig = ThemeConfig,
  U extends BundlerConfig = BundlerConfig
> extends SiteData {
  // theme options
  theme: string
  themeConfig: Partial<T>

  // bundler options
  bundler: string
  bundlerConfig: Partial<U>

  // directory options
  source: string
  dest: string
  temp: string
  cache: string
  public: string

  // shared options
  debug: boolean
  markdown: MarkdownOptions
  pagePatterns: string[]
  plugins: PluginConfig[]

  // dev options
  host: string
  port: number
  open: boolean
  templateDev: string

  // build options
  shouldPreload: ((file: string, type: string) => boolean) | boolean
  shouldPrefetch: ((file: string, type: string) => boolean) | boolean
  templateSSR: string
}

export type AppConfig<
  T extends ThemeConfig = ThemeConfig,
  U extends BundlerConfig = BundlerConfig
> = Partial<AppOptions<T, U>> & Pick<AppOptions<T, U>, 'source'>
