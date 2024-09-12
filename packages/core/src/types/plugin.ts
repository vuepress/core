import type { App } from './app/index.js'
import type { HooksExposed } from './pluginApi/index.js'

/**
 * Vuepress plugin
 *
 * A plugin should be rather:
 * - an object (`PluginObject`)
 * - a function that returns an object (`PluginFunction`)
 *
 * A plugin package should have a `Plugin` as the default export
 */
export type Plugin<T extends PluginObject = PluginObject> =
  | PluginFunction<T>
  | T

/**
 * Vuepress plugin function
 *
 * It accepts plugin options and vuepress app, returns plugin object
 */
export type PluginFunction<T extends PluginObject = PluginObject> = (
  app: App,
) => T

/**
 * Vuepress plugin object
 */
export interface PluginObject extends Partial<HooksExposed> {
  /**
   * Name of the plugin
   */
  name: string

  /**
   * Allow the plugin to be used multiple times or not
   */
  multiple?: boolean
}

/**
 * Config field for plugins
 */
export type PluginConfig = (Plugin | Plugin[])[]
