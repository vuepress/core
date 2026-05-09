import type { App } from '@vuepress/core'
import { prepareUserStyle } from '@vuepress/core'
import { colors, logger } from '@vuepress/utils'
import type { FSWatcher } from 'chokidar'
import chokidar from 'chokidar'

export const watchUserStyleFile = (app: App): FSWatcher => {
  const styleWatcher = chokidar.watch(app.options.userStyle!, {
    cwd: app.dir.source(),
    ignoreInitial: true,
  })

  styleWatcher.on('add', (styleFile) => {
    logger.info(`style ${colors.magenta(styleFile)} is created`)
    void prepareUserStyle(app, true)
  })

  styleWatcher.on('unlink', (styleFile) => {
    logger.info(`style ${colors.magenta(styleFile)} is deleted`)
    void prepareUserStyle(app, false)
  })

  return styleWatcher
}
