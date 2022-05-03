import { hasExportDefault } from '@vuepress/utils'
import type { UserConfigLoader } from './types'

/**
 * Load cjs config file
 */
export const loadUserConfigCjs: UserConfigLoader = async (userConfigPath) => {
  const required = require(userConfigPath)
  return hasExportDefault(required) ? required.default : required
}
