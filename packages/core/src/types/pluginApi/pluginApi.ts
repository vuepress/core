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
    [Key in HooksName]: HookQueue<Key>
  }

  /**
   * Register hooks of plugins
   *
   * Should be invoked before applying a hook
   */
  registerHooks: () => void
}
