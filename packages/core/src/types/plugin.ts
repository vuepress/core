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

  /**
   * Custom data store for plugin state.
   *
   * Plugins can use this field to attach arbitrary state that is scoped
   * to the current app lifecycle. The data is automatically discarded when
   * the app is recreated on dev server restart, avoiding module-level
   * variable leaks.
   *
   * @example
   * ```ts
   * const myPlugin = {
   *   name: 'my-plugin',
   *   data: {
   *     watcher: null as FSWatcher | null,
   *   },
   *   onCleanup(app, stage) {
   *     if (stage === 'ready') {
   *       myPlugin.data.watcher = chokidar.watch('my-files')
   *     }
   *     if (stage === 'restart') {
   *       myPlugin.data.watcher?.close()
   *     }
   *   },
   * }
   * export default myPlugin
   * ```
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- allow arbitrary data
  data?: Record<string, any>
}

/**
 * Config field for plugins
 */
export type PluginConfig = (Plugin | Plugin[])[]
