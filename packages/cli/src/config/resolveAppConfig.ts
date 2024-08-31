import type { AppConfig } from '@vuepress/core'
import { ensureEndingSlash, ensureLeadingSlash } from '@vuepress/shared'
import { colors, isChildPath, logger } from '@vuepress/utils'

/**
 * Resolve app config according to:
 *
 * - default options
 * - user config file
 * - cli options
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
    ...defaultAppConfig,
    // user config from config file
    ...userConfig,
    // allow cli options to override config file
    ...cliAppConfig,
  }

  if (appConfig.source === undefined) {
    logger.error(`The ${colors.magenta('source')} option is missing.`)
    return null
  }

  if (appConfig.bundler === undefined || appConfig.theme === undefined) {
    logger.error(
      `The ${colors.magenta('bundler')} or ${colors.magenta('theme')} option is missing. For more details: ${colors.green('https://vuepress.vuejs.org/guide/troubleshooting.html#the-bundler-theme-option-is-missing')}`,
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
        ` to ${colors.magenta(appConfig.base)}`,
    )
  }

  if (appConfig.dest && isChildPath(appConfig.source, appConfig.dest)) {
    logger.warn(
      `${colors.magenta('dest')} directory would be emptied during build,` +
        ` so we fallback it to the default directory for the safety of your source files`,
    )
    delete appConfig.dest
  }

  return appConfig as AppConfig
}
