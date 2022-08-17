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
  | T
  | PluginFunction<T>

/**
 * Vuepress plugin function
 *
 * It accepts plugin options and vuepress app, returns plugin object
 */
export type PluginFunction<T extends PluginObject = PluginObject> = (
  app: App
) => T

/**
 * Vuepress plugin object
 */
export interface PluginObject extends Partial<HooksExposed> {
  // plugin name
  name: string

  // allow use a plugin multiple times or not
  multiple?: boolean
}

/**
 * Config field for plugins
 */
export type PluginConfig = (Plugin | Plugin[])[]
