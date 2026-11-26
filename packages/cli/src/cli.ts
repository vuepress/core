import { createRequire } from 'node:module'
import process from 'node:process'

import type { AppConfig } from '@vuepress/core'
import { colors, logger } from '@vuepress/utils'
import type { CAC } from 'cac'
import { cac } from 'cac'

import { build, dev, info } from './commands/index.js'
import type {
  BuildCommandCliOptions,
  DevCommandCliOptions,
} from './types/index.js'

const require = createRequire(import.meta.url)

/**
 * Options of handling cli errors
 */
export interface HandleCliErrorOptions {
  /**
   * Whether to print the error stack
   */
  debug?: boolean
}

/**
 * Print a human readable error message and set a non-zero exit code
 *
 * The internal stack is only printed in debug mode.
 */
export const handleCliError = (
  error: unknown,
  { debug = false }: HandleCliErrorOptions = {},
): void => {
  logger.error(
    colors.red(error instanceof Error ? error.message : String(error)),
  )

  if (debug && error instanceof Error && error.stack) {
    logger.error(colors.red(error.stack))
  }

  process.exitCode = 1
}

/**
 * Create vuepress cli instance
 */
export const createCli = (defaultAppConfig: Partial<AppConfig> = {}): CAC => {
  // create cac instance
  const program = cac('vuepress')

  // display core version and cli version
  const versionCli = (require('../package.json') as { version: string }).version
  const versionCore = (
    require('@vuepress/core/package.json') as { version: string }
  ).version
  program.version(`core@${versionCore} vuepress/cli@${versionCli}`)

  // display help message
  program.help()

  // register `dev` command
  program
    .command('dev [sourceDir]', 'Start development server')
    .option('-c, --config <config>', 'Set path to config file')
    .option('-p, --port <port>', 'Use specified port (default: 8080)')
    .option('-t, --temp <temp>', 'Set the directory of the temporary files')
    .option('--host <host>', 'Use specified host (default: 0.0.0.0)')
    .option('--cache <cache>', 'Set the directory of the cache files')
    .option('--clean-temp', 'Clean the temporary files before dev')
    .option('--clean-cache', 'Clean the cache files before dev')
    .option('--open', 'Open browser when ready')
    .option('--debug', 'Enable debug mode')
    .option('--no-watch', 'Disable watching page and config files')
    .action(async (sourceDir?: string, cliOptions?: DevCommandCliOptions) =>
      dev({
        defaultAppConfig,
        sourceDir,
        cliOptions,
      }),
    )

  // register `build` command
  program
    .command('build [sourceDir]', 'Build to static site')
    .option('-c, --config <config>', 'Set path to config file')
    .option(
      '-d, --dest <dest>',
      'Set the directory build output (default: .vuepress/dist)',
    )
    .option('-t, --temp <temp>', 'Set the directory of the temporary files')
    .option('--cache <cache>', 'Set the directory of the cache files')
    .option('--clean-temp', 'Clean the temporary files before build')
    .option('--clean-cache', 'Clean the cache files before build')
    .option('--debug', 'Enable debug mode')
    .action(async (sourceDir?: string, cliOptions?: BuildCommandCliOptions) =>
      build({
        defaultAppConfig,
        sourceDir,
        cliOptions,
      }),
    )

  // register `info` command
  program.command('info', 'Display environment information').action(info)

  return program
}

/**
 * Parse argv and run the matched command
 *
 * Both sync and async errors are caught, printed as human readable messages,
 * and reflected by a non-zero exit code. Help and version are printed by
 * `parse` itself, so they are neither duplicated nor treated as errors.
 */
export const runCli = async (
  program: CAC,
  argv: string[] = process.argv,
): Promise<void> => {
  try {
    program.parse(argv, { run: false })
  } catch (error) {
    handleCliError(error, { debug: program.options.debug === true })
    return
  }

  // `parse` has already printed help (global or command help) and unset the
  // matched command, so do not output it again
  if (program.options.help) return

  // bare `-v` / `--version` is printed by `parse`; with a matched command
  // `parse` leaves it to us
  if (program.options.version) {
    if (program.matchedCommand) program.outputVersion()
    return
  }

  if (program.matchedCommand) {
    try {
      await program.runMatchedCommand()
    } catch (error) {
      handleCliError(error, { debug: program.options.debug === true })
    }
    return
  }

  const [unknownCommand] = program.args

  if (unknownCommand) {
    handleCliError(
      new Error(
        `Unknown command \`${unknownCommand}\`. Run \`vuepress --help\` to see available commands.`,
      ),
    )
    return
  }

  // fallback to help messages
  program.outputHelp()
}

/**
 * Vuepress cli
 */
export const cli = (defaultAppConfig: Partial<AppConfig> = {}): void => {
  const program = createCli(defaultAppConfig)

  void runCli(program)
    .catch((error: unknown) => handleCliError(error))
    .finally(() => {
      // a failed `dev` may already hold a listening server or watchers, which
      // would keep the event loop alive; make sure the exit code is honored
      if (process.exitCode !== undefined && process.exitCode !== 0) {
        process.exit(process.exitCode)
      }
    })
}
