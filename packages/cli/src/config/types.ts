import type { AppConfig, PluginObject } from '@vuepress/core'

/**
 * User config type of vuepress
 *
 * It will be transformed to `AppConfig` by cli
 */
export type UserConfig = Partial<AppConfig> &
  // user config can be used as a plugin
  Omit<PluginObject, 'name' | 'multiple'>
