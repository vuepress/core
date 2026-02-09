import { debug } from '@vuepress/utils'
import type { UserConfig } from '../types/index.js'
import { loadUserConfig } from './loadUserConfig.js'
import { resolveUserConfigConventionalPath } from './resolveUserConfigConventionalPath.js'
import { resolveUserConfigPath } from './resolveUserConfigPath.js'

const log = debug('vuepress:cli/resolveUserConfig')

export const resolveUserConfig = async ({
  cliOptionsConfig,
  cliAppConfigSource,
}: {
  cliOptionsConfig?: string
  cliAppConfigSource: string
}): Promise<{
  userConfig: UserConfig
  userConfigDependencies: string[]
  userConfigPath?: string
}> => {
  // resolve user config file path
  const userConfigPath = cliOptionsConfig
    ? resolveUserConfigPath(cliOptionsConfig)
    : resolveUserConfigConventionalPath(cliAppConfigSource)

  log(`userConfigPath:`, userConfigPath)

  // load user config
  const { userConfig, userConfigDependencies } =
    await loadUserConfig(userConfigPath)

  return {
    userConfig,
    userConfigDependencies,
    userConfigPath,
  }
}
