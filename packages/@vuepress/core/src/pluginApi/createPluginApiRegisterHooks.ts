import type { PluginApi } from '../types'
import { normalizeClientConfigFileHook } from './normalizeClientConfigFileHook'
import { normalizeReturnObjectHook } from './normalizeReturnObjectHook'

export const createPluginApiRegisterHooks =
  (
    plugins: PluginApi['plugins'],
    hooks: PluginApi['hooks']
  ): PluginApi['registerHooks'] =>
  () => {
    plugins.forEach(
      ({
        name: pluginName,

        alias,
        define,
        clientConfigFile,

        ...commonHooks
      }) => {
        /**
         * hooks that need to be normalized
         */
        if (alias) {
          hooks.alias.add({
            pluginName,
            hook: normalizeReturnObjectHook(alias),
          })
        }

        if (define) {
          hooks.define.add({
            pluginName,
            hook: normalizeReturnObjectHook(define),
          })
        }

        if (clientConfigFile) {
          hooks.clientConfigFile.add({
            pluginName,
            hook: normalizeClientConfigFileHook(clientConfigFile),
          })
        }

        /**
         * common hooks
         */
        Object.entries(commonHooks).forEach(([key, hook]) => {
          if (hooks[key] && hook) {
            hooks[key].add({
              pluginName,
              hook,
            })
          }
        })
      }
    )
  }
