import type { AppConfig } from '@vuepress/core'
import { path } from '@vuepress/utils'

const OPTIONS_COMMON = ['debug', 'open', 'port', 'host'] as const
const OPTIONS_DIRECTORY = ['cache', 'dest', 'temp'] as const

/**
 * Resolve app config according to command options of cli
 */
export const resolveAppConfigFromCommandOptions = (
  sourceDir: string,
  commandOptions: Partial<AppConfig>,
  cwd = process.cwd()
): AppConfig => {
  // resolve the source directory
  const source = path.resolve(cwd, sourceDir)

  const appConfig: AppConfig = {
    source,
  }

  // set app config from command options
  // notice that we do not want to override user config unless it is set explicitly via cli
  OPTIONS_COMMON.forEach((name) => {
    if (commandOptions[name] !== undefined) {
      // @ts-expect-error: the types could not be narrowed correctly
      appConfig[name] = commandOptions[name]
    }
  })
  OPTIONS_DIRECTORY.forEach((name) => {
    if (commandOptions[name] !== undefined) {
      appConfig[name] = path.resolve(cwd, commandOptions[name])
    }
  })

  return appConfig
}
