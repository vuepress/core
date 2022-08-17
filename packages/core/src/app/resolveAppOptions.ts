import { createRequire } from 'node:module'
import { path } from '@vuepress/utils'
import type { AppConfig, AppOptions } from '../types/index.js'

const require = createRequire(import.meta.url)

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
  // directory config
  source,
  dest = path.resolve(source, '.vuepress/dist'),
  temp = path.resolve(source, '.vuepress/.temp'),
  cache = path.resolve(source, '.vuepress/.cache'),
  public: publicDir = path.resolve(source, '.vuepress/public'),
  // dev config
  host = '0.0.0.0',
  port = 8080,
  open = false,
  templateDev = path.normalize(
    require.resolve('@vuepress/client/templates/dev.html')
  ),
  // build config
  shouldPreload = true,
  shouldPrefetch = true,
  templateBuild = path.normalize(
    require.resolve('@vuepress/client/templates/build.html')
  ),
  // common config
  bundler,
  debug = false,
  markdown = {},
  pagePatterns = ['**/*.md', '!.vuepress', '!node_modules'],
  permalinkPattern = null,
  plugins = [],
  theme,
}: AppConfig): AppOptions => ({
  base,
  lang,
  title,
  description,
  head,
  locales,
  source,
  dest,
  temp,
  cache,
  public: publicDir,
  host,
  port,
  open,
  templateDev,
  shouldPreload,
  shouldPrefetch,
  templateBuild,
  bundler,
  debug,
  markdown,
  pagePatterns,
  permalinkPattern,
  plugins,
  theme,
})
