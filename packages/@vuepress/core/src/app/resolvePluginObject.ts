import { isFunction, isString } from '@vuepress/shared'
import { chalk, logger } from '@vuepress/utils'
import type { App, Plugin, PluginObject, PluginOptions } from '../types'
import { resolvePluginModule } from './resolvePluginModule'

/**
 * Resolve a plugin object according to name / path / module and config
 */
export const resolvePluginObject = <
  T extends PluginOptions = PluginOptions,
  U extends PluginObject = PluginObject
>(
  app: App,
  plugin: Plugin<T, U> | string,
  pluginConfig: Partial<T> = {}
): U => {
  const pluginModule = isString(plugin)
    ? resolvePluginModule<T, U>(plugin)
    : plugin

  if (pluginModule === null) {
    throw logger.createError(`plugin is not found: ${chalk.magenta(plugin)}`)
  }

  const pluginObject = isFunction(pluginModule)
    ? pluginModule(pluginConfig, app)
    : pluginModule

  return pluginObject as U
}
