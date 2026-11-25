import os from 'node:os'
import process from 'node:process'

import type { AppConfig } from '@vuepress/core'
import { ensureEndingSlash, ensureLeadingSlash } from '@vuepress/shared'
import { colors, isChildPath, logger, path } from '@vuepress/utils'

type CleanedDirectoryOption = 'cache' | 'dest' | 'temp'

const CLEANED_DIRECTORY_OPTIONS: CleanedDirectoryOption[] = [
  'dest',
  'temp',
  'cache',
]

const directoryActions: Record<CleanedDirectoryOption, string> = {
  cache: 'removed when cleaning cache files',
  dest: 'emptied during build',
  temp: 'removed when cleaning temp files',
}

/**
 * Get the reason why a directory is not safe to be cleaned, or `null` if it is
 * safe.
 */
const getUnsafeDirectoryReason = (
  directory: string,
  source: string,
  cwd: string,
): string | null => {
  if (path.dirname(directory) === directory) {
    return 'it is the filesystem root'
  }

  if (directory === path.resolve(os.homedir())) {
    return 'it is the user home directory'
  }

  if (directory === path.resolve(source, '.vuepress')) {
    return 'it is the directory that holds the vuepress config files'
  }

  if (isChildPath(source, directory)) {
    return `it is equal to or contains the source directory ${colors.cyan(source)}`
  }

  if (isChildPath(cwd, directory)) {
    return `it is equal to or contains the current working directory ${colors.cyan(cwd)}`
  }

  return null
}

/**
 * Resolve directory options to absolute paths, and make sure that cleaning them
 * will not destroy the source directory or the working directory.
 */
const resolveAppDirectories = (
  appConfig: AppConfig,
  cwd: string,
): AppConfig | null => {
  // Normalize `cwd` to an absolute path with a platform-consistent path flavor,
  // so that public callers passing a posix-style `cwd` on Windows still get
  // consistent `isChildPath` comparisons.
  const resolvedCwd = path.resolve(cwd)

  const source = path.resolve(resolvedCwd, appConfig.source)
  appConfig.source = source

  const unsafeDirectories: string[] = []

  CLEANED_DIRECTORY_OPTIONS.forEach((name) => {
    const rawDirectory = appConfig[name]
    if (rawDirectory === undefined) return

    const directory = path.resolve(resolvedCwd, rawDirectory)
    appConfig[name] = directory

    const reason = getUnsafeDirectoryReason(directory, source, resolvedCwd)
    if (reason === null) return

    unsafeDirectories.push(
      `The ${colors.magenta(name)} directory ${colors.cyan(directory)} would be ${directoryActions[name]}, but ${reason}.`,
    )
  })

  if (unsafeDirectories.length > 0) {
    unsafeDirectories.forEach((message) => logger.error(message))
    logger.error(
      `Please set the ${colors.magenta('dest')}, ${colors.magenta('temp')} and ${colors.magenta('cache')} options to dedicated directories.`,
    )
    return null
  }

  return appConfig
}

/**
 * Resolve app config according to:
 *
 * - default options
 * - user config file
 * - cli options
 */
export const resolveAppConfig = ({
  defaultAppConfig,
  cliAppConfig,
  userConfig,
  cwd = process.cwd(),
}: {
  defaultAppConfig: Partial<AppConfig>
  cliAppConfig: Partial<AppConfig>
  userConfig: Partial<AppConfig>
  cwd?: string
}): AppConfig | null => {
  const appConfig = {
    // allow setting default app config via `cli()`
    ...defaultAppConfig,
    // user config from config file
    ...userConfig,
    // allow cli options to override config file
    ...cliAppConfig,
  }

  if (appConfig.source === undefined) {
    logger.error(`The ${colors.magenta('source')} option is missing.`)
    return null
  }

  if (appConfig.bundler === undefined || appConfig.theme === undefined) {
    logger.error(
      `The ${colors.magenta('bundler')} or ${colors.magenta('theme')} option is missing. For more details: ${colors.green('https://vuepress.vuejs.org/guide/troubleshooting.html#the-bundler-theme-option-is-missing')}`,
    )
    return null
  }

  if (
    appConfig.base &&
    !(appConfig.base.startsWith('/') && appConfig.base.endsWith('/'))
  ) {
    const rawBase = appConfig.base
    appConfig.base = ensureLeadingSlash(ensureEndingSlash(rawBase)) as
      | '/'
      | `/${string}/`
    logger.warn(
      `${colors.magenta('base')} should start and end with a slash (/),` +
        ` so it has been normalized from ${colors.magenta(rawBase)}` +
        ` to ${colors.magenta(appConfig.base)}`,
    )
  }

  // resolve directory options to absolute paths and make sure that they are
  // safe to be cleaned before any destructive file operation happens
  return resolveAppDirectories(appConfig as AppConfig, cwd)
}
