/**
 * Type of `dev` command function
 */
export type BuildCommand = (
  sourceDir?: string,
  commandOptions?: BuildCommandOptions
) => Promise<void>

/**
 * CLI options of `build` command
 */
export interface BuildCommandOptions {
  // app config
  dest?: string
  temp?: string
  cache?: string
  debug?: boolean

  // cli only
  config?: string
  cleanTemp?: boolean
  cleanCache?: boolean
}
