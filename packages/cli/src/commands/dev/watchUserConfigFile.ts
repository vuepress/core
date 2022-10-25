import process from 'node:process'
import { logger, picocolors } from '@vuepress/utils'
import chokidar from 'chokidar'
import type { FSWatcher } from 'chokidar'

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
    logger.info(`config ${picocolors.magenta(configFile)} is modified`)
    restart()
  })

  const depsWatcher = chokidar.watch(userConfigDependencies, {
    cwd,
    ignoreInitial: true,
  })
  depsWatcher.on('change', (depFile) => {
    logger.info(`config dependency ${picocolors.magenta(depFile)} is modified`)
    restart()
  })

  return [configWatcher, depsWatcher]
}
