import process from 'node:process'
import { fs, logger, path, picocolors } from '@vuepress/utils'

/**
 * Resolve file path of user config
 */
export const resolveUserConfigPath = (
  config: string,
  cwd = process.cwd()
): string => {
  const configPath = path.resolve(cwd, config)

  if (!fs.pathExistsSync(configPath)) {
    throw logger.createError(
      `config file does not exist: ${picocolors.magenta(config)}`
    )
  }

  return configPath
}
