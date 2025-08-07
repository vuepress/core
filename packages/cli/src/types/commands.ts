import type { AppConfig } from '@vuepress/core'

/**
 * Base CLI options for commands
 */
export interface BaseCommandCliOptions {
  // app config
  temp?: string
  cache?: string
  debug?: boolean

  // cli only
  config?: string
  cleanTemp?: boolean
  cleanCache?: boolean
}

/**
 * Base options for commands
 */
export interface BaseCommandOptions<T extends BaseCommandCliOptions> {
  defaultAppConfig: Partial<AppConfig>
  sourceDir?: string
  cliOptions?: T
}

/**
 * CLI options of `build` command
 */
export interface BuildCommandCliOptions extends BaseCommandCliOptions {
  dest?: string
}

/**
 * Type of `build` command function
 */
export type BuildCommand = (
  options: BaseCommandOptions<BuildCommandCliOptions>,
) => Promise<void>

/**
 * CLI options of `dev` command
 */
export interface DevCommandCliOptions extends BaseCommandCliOptions {
  // app config
  port?: number
  host?: string
  open?: boolean

  // cli only
  watch?: boolean
}

/**
 * Type of `dev` command function
 */
export type DevCommand = (
  options: BaseCommandOptions<DevCommandCliOptions>,
) => Promise<void>

/**
 * Type of `info` command function
 */
export type InfoCommand = () => Promise<void>
