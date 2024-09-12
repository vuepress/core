import type { PluginApi } from '../types/index.js'
import { createPluginApiHooks } from './createPluginApiHooks.js'
import { createPluginApiRegisterHooks } from './createPluginApiRegisterHooks.js'

/**
 * Create vuepress plugin api
 *
 * @internal
 */
export const createPluginApi = (): PluginApi => {
  const plugins: PluginApi['plugins'] = []
  const hooks = createPluginApiHooks()
  const registerHooks = createPluginApiRegisterHooks(plugins, hooks)

  return {
    plugins,
    hooks,
    registerHooks,
  }
}
