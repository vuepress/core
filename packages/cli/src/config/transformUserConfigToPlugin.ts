import process from 'node:process'
import type { PluginObject } from '@vuepress/core'
import { fs, path } from '@vuepress/utils'
import type { UserConfig } from './types.js'

/**
 * Transform user config to a vuepress plugin
 */
export const transformUserConfigToPlugin = (
  userConfig: UserConfig,
  source: string,
  cwd = process.cwd()
): PluginObject => {
  const userConfigPlugin: PluginObject = {
    name: 'user-config',
    ...userConfig,
  }

  // if `clientConfigFile` is not set explicitly,
  // try to load conventional files
  if (userConfigPlugin.clientConfigFile === undefined) {
    userConfigPlugin.clientConfigFile = [
      path.resolve(cwd, 'vuepress.client.ts'),
      path.resolve(cwd, 'vuepress.client.js'),
      path.resolve(cwd, 'vuepress.client.mjs'),
      path.resolve(source, '.vuepress/client.ts'),
      path.resolve(source, '.vuepress/client.js'),
      path.resolve(source, '.vuepress/client.mjs'),
    ].find((item) => fs.pathExistsSync(item))
  }

  return userConfigPlugin
}
