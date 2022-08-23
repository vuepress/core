import type { HooksName, PluginApi } from '../types/index.js'
import { normalizeAliasDefineHook } from './normalizeAliasDefineHook.js'
import { normalizeClientConfigFileHook } from './normalizeClientConfigFileHook.js'

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
            hook: normalizeAliasDefineHook(alias),
          })
        }

        if (define) {
          hooks.define.add({
            pluginName,
            hook: normalizeAliasDefineHook(define),
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
          if (hooks[key as HooksName] && hook) {
            hooks[key as HooksName].add({
              pluginName,
              hook,
            })
          }
        })
      }
    )
  }
