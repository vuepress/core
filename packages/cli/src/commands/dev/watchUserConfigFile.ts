import process from 'node:process'
import { colors, logger } from '@vuepress/utils'
import type { FSWatcher } from 'chokidar'
import chokidar from 'chokidar'

export const watchUserConfigFile = ({
  userConfigPath,
  userConfigDependencies,
  restart,
}: {
  userConfigPath: string
  userConfigDependencies: string[]
  restart: () => Promise<void>
}): FSWatcher[] => {
  const cwd = process.cwd()

  const configWatcher = chokidar.watch(userConfigPath, {
    cwd,
    ignoreInitial: true,
  })
  configWatcher.on('change', (configFile) => {
    logger.info(`config ${colors.magenta(configFile)} is modified`)
    void restart()
  })

  const depsWatcher = chokidar.watch(userConfigDependencies, {
    cwd,
    ignoreInitial: true,
  })
  depsWatcher.on('change', (depFile) => {
    logger.info(`config dependency ${colors.magenta(depFile)} is modified`)
    void restart()
  })

  return [configWatcher, depsWatcher]
}
