import type { PluginApi } from '../types/index.js'
import { normalizeAliasDefineHook } from './normalizeAliasDefineHook.js'
import { normalizeClientConfigFileHook } from './normalizeClientConfigFileHook.js'

/**
 * Create registerHooks method for plugin api
 *
 * @internal
 */
export const createPluginApiRegisterHooks =
  (
    plugins: PluginApi['plugins'],
    hooks: PluginApi['hooks'],
  ): PluginApi['registerHooks'] =>
  () => {
    plugins.forEach(
      ({
        name: pluginName,
        multiple,

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
        Object.keys(commonHooks).forEach((key) => {
          if (hooks[key] && commonHooks[key]) {
            hooks[key as keyof typeof hooks].add({
              pluginName,
              // @ts-expect-error: the type could not be narrowed correctly
              hook: commonHooks[key as keyof typeof commonHooks],
            })
          }
        })
      },
    )
  }
