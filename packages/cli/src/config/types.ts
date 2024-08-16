import type { AppConfig, PluginObject } from '@vuepress/core'

/**
 * User config type of vuepress
 *
 * It will be transformed to `AppConfig` by cli
 */
export type UserConfig = Omit<PluginObject, 'multiple' | 'name'> &
  Partial<AppConfig>
