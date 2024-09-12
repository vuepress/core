import type { AppEnv, AppOptions } from '../types/index.js'

/**
 * Resolve environment flags for vuepress app
 */
export const resolveAppEnv = (options: AppOptions): AppEnv => ({
  isBuild: false,
  isDev: false,
  isDebug: options.debug,
})
