import type { AppConfig, PluginObject } from '@vuepress/core'
import type { BaseCommandCliOptions } from '../types/index.js'
import { resolveAppConfig } from './resolveAppConfig.js'
import { resolveCliAppConfig } from './resolveCliAppConfig.js'
import { resolveUserConfig } from './resolveUserConfig.js'
import { transformUserConfigToPlugin } from './transformUserConfigToPlugin.js'

export const resolveConfig = async ({
  sourceDir,
  cliOptions,
  defaultAppConfig,
}: {
  sourceDir: string
  cliOptions: BaseCommandCliOptions
  defaultAppConfig: Partial<AppConfig>
}): Promise<{
  appConfig: AppConfig | null
  userConfigDependencies: string[]
  userConfigPath?: string
  userConfigPlugin: PluginObject
}> => {
  // resolve cli app config from cli options
  const cliAppConfig = resolveCliAppConfig(sourceDir, cliOptions)

  // resolve user config from cli options and cli app config
  const { userConfig, userConfigDependencies, userConfigPath } =
    await resolveUserConfig({
      cliOptionsConfig: cliOptions.config,
      cliAppConfigSource: cliAppConfig.source,
    })

  // transform user config to a plugin
  const userConfigPlugin = transformUserConfigToPlugin(
    userConfig,
    cliAppConfig.source,
  )

  // resolve the final app config to use
  const appConfig = resolveAppConfig({
    defaultAppConfig,
    cliAppConfig,
    userConfig,
  })

  return {
    appConfig,
    userConfigDependencies,
    userConfigPath,
    userConfigPlugin,
  }
}
