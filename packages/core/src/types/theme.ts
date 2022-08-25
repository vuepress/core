import type {
  Plugin,
  PluginConfig,
  PluginFunction,
  PluginObject,
} from './plugin.js'

/**
 * Vuepress theme
 *
 * Theme is a special type of plugin, it should be rather:
 * - an object (`ThemeObject`)
 * - a function that returns an object (`ThemeFunction`)
 *
 * A theme package should have a `Theme` as the default export
 */
export type Theme = Plugin<ThemeObject>

/**
 * Vuepress theme function
 */
export type ThemeFunction = PluginFunction<ThemeObject>

/**
 * Vuepress theme object
 */
export interface ThemeObject extends Omit<PluginObject, 'multiple'> {
  /**
   * Extended parent theme
   */
  extends?: Theme

  /**
   * Allow using plugins in theme
   */
  plugins?: PluginConfig

  /**
   * Allow overriding default templateBuild
   */
  templateBuild?: string

  /**
   * Allow overriding default templateDev
   */
  templateDev?: string
}

/**
 * Resolved theme info
 */
export interface ThemeInfo {
  /**
   * Plugins, including theme itself and plugins used by theme
   */
  plugins: PluginConfig

  /**
   * Default build template
   */
  templateBuild?: string

  /**
   * Default dev template
   */
  templateDev?: string
}
