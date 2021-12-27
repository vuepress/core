import type { App, PluginConfig, PluginObject } from '../types'
import { normalizePluginConfig } from './normalizePluginConfig'
import { resolvePluginObject } from './resolvePluginObject'

/**
 * Resolve plugin objects from plugin config array
 */
export const resolvePluginsFromConfig = (
  app: App,
  plugins: PluginConfig[] = []
): PluginObject[] =>
  plugins.reduce((prev, item) => {
    const [plugin, config] = normalizePluginConfig(item)
    if (config !== false) {
      prev.push(resolvePluginObject(app, plugin, config === true ? {} : config))
    }
    return prev
  }, [] as PluginObject[])
