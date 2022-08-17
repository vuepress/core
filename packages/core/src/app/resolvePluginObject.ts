import { isFunction } from '@vuepress/shared'
import type { App, Plugin, PluginObject } from '../types/index.js'

/**
 * Resolve a plugin object according to name / path / module and config
 */
export const resolvePluginObject = <T extends PluginObject = PluginObject>(
  app: App,
  plugin: Plugin<T>
): T => (isFunction(plugin) ? plugin(app) : plugin)
