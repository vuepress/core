import type {
  AppConfig,
  BundlerConfig,
  PluginObject,
  ThemeConfig,
} from '@vuepress/core'

/**
 * User config type of vuepress
 *
 * It will be transformed to `AppConfig` by cli
 */
export type UserConfig<
  T extends ThemeConfig = ThemeConfig,
  U extends BundlerConfig = BundlerConfig
> = Partial<AppConfig<T, U>> &
  // user config can be used as a plugin
  Omit<PluginObject, 'name' | 'multiple'>

export type UserConfigLoader = (userConfigPath: string) => Promise<UserConfig>
