/**
 * Directory util function
 */
export type AppDirFunction = (...args: string[]) => string

/**
 * Directory utils
 */
export interface AppDir {
  /**
   * Resolve file path in cache directory
   */
  cache: AppDirFunction

  /**
   * Resolve file path in temp directory
   */
  temp: AppDirFunction

  /**
   * Resolve file path in source directory
   */
  source: AppDirFunction

  /**
   * Resolve file path in dest directory
   */
  dest: AppDirFunction

  /**
   * Resolve file path in public directory
   */
  public: AppDirFunction

  /**
   * Resolve file path in client directory
   */
  client: AppDirFunction
}

/**
 * Environment flags
 */
export interface AppEnv {
  /**
   * Is running in build mode or not
   */
  isBuild: boolean

  /**
   * Is running in dev mode or not
   */
  isDev: boolean

  /**
   * Is debug mode enabled or not
   */
  isDebug: boolean
}

/**
 * Write temp file util
 */
export type AppWriteTemp = (file: string, content: string) => Promise<string>
