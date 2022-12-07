import { createRequire } from 'node:module'
import process from 'node:process'
import type { AppConfig } from '@vuepress/core'
import { colors } from '@vuepress/utils'
import { cac } from 'cac'
import { createBuild, createDev, info } from './commands/index.js'

const require = createRequire(import.meta.url)

/**
 * Vuepress cli
 */
export const cli = (defaultAppConfig: Partial<AppConfig> = {}): void => {
  // create cac instance
  const program = cac('vuepress')

  // display core version and cli version
  const versionCli = require('../package.json').version
  const versionCore = require('@vuepress/core/package.json').version
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
    .action(createDev(defaultAppConfig))

  // register `build` command
  program
    .command('build [sourceDir]', 'Build to static site')
    .option('-c, --config <config>', 'Set path to config file')
    .option(
      '-d, --dest <dest>',
      'Set the directory build output (default: .vuepress/dist)'
    )
    .option('-t, --temp <temp>', 'Set the directory of the temporary files')
    .option('--cache <cache>', 'Set the directory of the cache files')
    .option('--clean-temp', 'Clean the temporary files before build')
    .option('--clean-cache', 'Clean the cache files before build')
    .option('--debug', 'Enable debug mode')
    .action(createBuild(defaultAppConfig))

  // register `info` command
  program.command('info', 'Display environment information').action(info)

  program.parse(process.argv, { run: false })

  // run command or fallback to help messages
  if (program.matchedCommand) {
    program.runMatchedCommand().catch((err) => {
      console.error(colors.red(err.stack))
      process.exit(1)
    })
  } else {
    program.outputHelp()
  }
}
