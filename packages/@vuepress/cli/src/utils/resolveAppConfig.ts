import type { AppConfig } from '@vuepress/core'
import { chalk, logger } from '@vuepress/utils'

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
      `${chalk.magenta('bundler')} and ${chalk.magenta('theme')} are required`
    )
    return null
  }

  return appConfig
}
