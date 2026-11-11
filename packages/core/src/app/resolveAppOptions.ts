import { createRequire } from 'node:module'

import { path, templateRenderer } from '@vuepress/utils'

import type { AppConfig, AppOptions } from '../types/index.js'

const require = createRequire(import.meta.url)

/**
 * Create app options with default values
 *
 * @internal
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
    require.resolve('@vuepress/client/templates/dev.html'),
  ),
  // build config
  shouldPreload = true,
  shouldPrefetch = 'as-needed',
  templateBuild = path.normalize(
    require.resolve('@vuepress/client/templates/build.html'),
  ),
  templateBuildRenderer = templateRenderer,
  // common config
  bundler,
  debug = false,
  markdown = {},
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  pagePatterns: _pagePatterns,
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  permalinkPattern: _permalinkPattern,
  route: userRoute = {},
  userStyle = null,
  plugins = [],
  theme,
}: AppConfig): AppOptions => {
  // fallback root locale config
  locales['/'] ??= { lang, title, description }

  return {
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
    templateBuildRenderer,
    bundler,
    debug,
    markdown,
    route: {
      // each `route` field falls back to the deprecated top-level config first,
      // then to the built-in default, so that a partial `route` object does not
      // silently drop the legacy `pagePatterns` / `permalinkPattern`
      cleanUrl: userRoute.cleanUrl ?? false,
      pagePatterns: userRoute.pagePatterns ??
        _pagePatterns ?? ['**/*.md', '!.vuepress'],
      permalinkPattern:
        userRoute.permalinkPattern === undefined
          ? (_permalinkPattern ?? null)
          : userRoute.permalinkPattern,
    },
    userStyle,
    plugins,
    theme,
  }
}
