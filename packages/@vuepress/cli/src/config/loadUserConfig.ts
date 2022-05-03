import { loadUserConfigCjs } from './loadUserConfigCjs'
import type { UserConfig, UserConfigLoader } from './types'

const loaderMap: [RegExp, UserConfigLoader][] = [
  [/\.(js|cjs|ts)$/, loadUserConfigCjs],
]

/**
 * Load user config file
 */
export const loadUserConfig = async (
  userConfigPath?: string
): Promise<UserConfig> => {
  if (!userConfigPath) return {}

  for (const [condition, loader] of loaderMap) {
    if (condition.test(userConfigPath)) {
      return loader(userConfigPath)
    }
  }

  return {}
}
