import type { AppEnv, AppOptions } from '../types/index.js'

/**
 * Resolve environment flags for vuepress app
 */
export const resolveAppEnv = (
  options: AppOptions,
  isBuild: boolean
): AppEnv => ({
  isBuild,
  isDev: !isBuild,
  isDebug: options.debug,
})
