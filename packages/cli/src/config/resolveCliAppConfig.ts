import process from 'node:process'
import type { AppConfig } from '@vuepress/core'
import { path } from '@vuepress/utils'
import type { BaseCommandCliOptions } from '../types/index.js'

const OPTIONS_COMMON = ['debug', 'open', 'port', 'host'] as const
const OPTIONS_DIRECTORY = ['cache', 'dest', 'temp'] as const

/**
 * Resolve app config according to command options of cli
 */
export const resolveCliAppConfig = (
  sourceDir: string,
  cliOptions: BaseCommandCliOptions,
  cwd = process.cwd(),
): Partial<AppConfig> & Pick<AppConfig, 'source'> => {
  // resolve the source directory
  const source = path.resolve(cwd, sourceDir)

  const appConfig: Partial<AppConfig> & Pick<AppConfig, 'source'> = {
    source,
  }

  // set app config from command options
  // notice that we do not want to override user config unless it is set explicitly via cli
  OPTIONS_COMMON.forEach((name) => {
    if (cliOptions[name] !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      appConfig[name] = cliOptions[name]
    }
  })
  OPTIONS_DIRECTORY.forEach((name) => {
    if (cliOptions[name] !== undefined) {
      appConfig[name] = path.resolve(cwd, cliOptions[name])
    }
  })

  return appConfig
}
