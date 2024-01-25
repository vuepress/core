export type {
  BuildCommand,
  BuildCommandOptions,
  DevCommand,
  DevCommandOptions,
  UserConfig,
} from '@vuepress/cli'

export {
  cli,
  createBuild,
  createDev,
  defineUserConfig,
  handlePageAdd,
  handlePageChange,
  handlePageUnlink,
  info,
  loadUserConfig,
  resolveAppConfig,
  resolveCliAppConfig,
  resolveUserConfigConventionalPath,
  resolveUserConfigPath,
  transformUserConfigToPlugin,
  watchPageFiles,
  watchUserConfigFile,
} from '@vuepress/cli'
