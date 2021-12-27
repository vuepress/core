import { path } from '@vuepress/utils'
import type { AppConfig, AppOptions } from '../types'

/**
 * Create app options with default values
 */
export const resolveAppOptions = ({
  // site config
  base = '/',
  lang = 'en-US',
  title = '',
  description = '',
  head = [],
  locales = {},

  // theme config
  theme = '@vuepress/theme-default',
  themeConfig = {},

  // bundler config
  bundler = '@vuepress/bundler-vite',
  bundlerConfig = {},

  // directory config
  source,
  dest = path.resolve(source, '.vuepress/dist'),
  temp = path.resolve(source, '.vuepress/.temp'),
  cache = path.resolve(source, '.vuepress/.cache'),
  public: publicDir = path.resolve(source, '.vuepress/public'),

  // markdown config
  markdown = {},

  // development config
  host = '0.0.0.0',
  port = 8080,
  debug = false,
  open = false,
  pagePatterns = ['**/*.md', '!.vuepress', '!node_modules'],
  templateDev = path.normalize(
    require.resolve('@vuepress/client/templates/index.dev.html')
  ),
  templateBuild = path.normalize(
    require.resolve('@vuepress/client/templates/index.build.html')
  ),
  shouldPreload = true,
  shouldPrefetch = false,

  // plugin config
  plugins = [],
}: AppConfig): AppOptions => ({
  base,
  lang,
  title,
  description,
  head,
  locales,
  theme,
  themeConfig,
  bundler,
  bundlerConfig,
  source,
  dest,
  temp,
  cache,
  public: publicDir,
  markdown,
  debug,
  host,
  port,
  open,
  pagePatterns,
  templateDev,
  templateBuild,
  shouldPreload,
  shouldPrefetch,
  plugins,
})
