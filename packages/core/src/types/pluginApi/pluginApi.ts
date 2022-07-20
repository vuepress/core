import type { PluginObject } from '../plugin.js'
import type { HookQueue, HooksName } from './hooks.js'

/**
 * Vuepress plugin system
 */
export interface PluginApi {
  /**
   * Plugins that have been used
   */
  plugins: PluginObject[]

  /**
   * All available hooks
   */
  hooks: {
    [K in HooksName]: HookQueue<K>
  }

  /**
   * Register hooks of plugins
   *
   * Should be invoked before applying a hook
   */
  registerHooks: () => void
}
