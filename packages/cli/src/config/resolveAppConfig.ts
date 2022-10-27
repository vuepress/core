import type { AppConfig } from '@vuepress/core'
import { ensureEndingSlash, ensureLeadingSlash } from '@vuepress/shared'
import { colors, isChildPath, logger } from '@vuepress/utils'

/**
 * Resolve app config according to:
 *
 * - default options
 * - cli options
 * - user config file
 */
export const resolveAppConfig = ({
  defaultAppConfig,
  cliAppConfig,
  userConfig,
}: {
  defaultAppConfig: Partial<AppConfig>
  cliAppConfig: Partial<AppConfig>
  userConfig: Partial<AppConfig>
}): AppConfig | null => {
  const appConfig = {
    // allow setting default app config via `cli()`
    // for example, set different default bundler in `vuepress` and `vuepress-vite` package
    ...defaultAppConfig,
    // use cli options to override config file
    ...userConfig,
    ...cliAppConfig,
  } as AppConfig

  if (appConfig.bundler === undefined || appConfig.theme === undefined) {
    logger.error(
      `${colors.magenta('bundler')} and ${colors.magenta('theme')} are required`
    )
    return null
  }

  if (
    appConfig.base &&
    !(appConfig.base.startsWith('/') && appConfig.base.endsWith('/'))
  ) {
    const rawBase = appConfig.base
    appConfig.base = ensureLeadingSlash(ensureEndingSlash(rawBase)) as
      | '/'
      | `/${string}/`
    logger.warn(
      `${colors.magenta('base')} should start and end with a slash (/),` +
        ` so it has been normalized from ${colors.magenta(rawBase)}` +
        ` to ${colors.magenta(appConfig.base)}`
    )
  }

  if (appConfig.dest && isChildPath(appConfig.source, appConfig.dest)) {
    logger.warn(
      `${colors.magenta('dest')} directory would be emptied during build,` +
        ` so we fallback it to the default directory for the safety of your source files`
    )
    delete appConfig.dest
  }

  return appConfig
}
