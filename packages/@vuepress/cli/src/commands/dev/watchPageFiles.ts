import type { App, Page } from '@vuepress/core'
import { chalk, logger } from '@vuepress/utils'
import * as chokidar from 'chokidar'
import type { FSWatcher } from 'chokidar'
import { handlePageAdd } from './handlePageAdd'
import { handlePageChange } from './handlePageChange'
import { handlePageUnlink } from './handlePageUnlink'
import { createPageDepsHelper } from './pageDepsHelper'

/**
 * Watch page files and deps, return file watchers
 */
export const watchPageFiles = (app: App): FSWatcher[] => {
  // watch page deps
  const depsWatcher = chokidar.watch([], {
    disableGlobbing: true,
    ignoreInitial: true,
  })
  const depsHelper = createPageDepsHelper()
  const addDeps = (page: Page): void => {
    const depsToAdd = depsHelper.add(page)
    depsWatcher.add(depsToAdd)
  }
  const removeDeps = (page: Page): void => {
    const depsToRemove = depsHelper.remove(page)
    depsWatcher.unwatch(depsToRemove)
  }
  const depsListener = async (dep: string): Promise<void> => {
    const pagePaths = depsHelper.get(dep)
    if (!pagePaths) return
    for (const filePathRelative of pagePaths) {
      logger.info(
        `dependency of page ${chalk.magenta(filePathRelative)} is modified`
      )
      await handlePageChange(app, app.dir.source(filePathRelative))
    }
  }
  depsWatcher.on('add', depsListener)
  depsWatcher.on('change', depsListener)
  depsWatcher.on('unlink', depsListener)
  app.pages.forEach((page) => addDeps(page))

  // watch page files
  const pagesWatcher = chokidar.watch(app.options.pagePatterns, {
    cwd: app.dir.source(),
    ignoreInitial: true,
  })
  pagesWatcher.on('add', async (filePathRelative) => {
    logger.info(`page ${chalk.magenta(filePathRelative)} is created`)
    const page = await handlePageAdd(app, app.dir.source(filePathRelative))
    if (page === null) return
    addDeps(page)
  })
  pagesWatcher.on('change', async (filePathRelative) => {
    logger.info(`page ${chalk.magenta(filePathRelative)} is modified`)
    const result = await handlePageChange(app, app.dir.source(filePathRelative))
    if (result === null) return
    const [pageOld, pageNew] = result
    removeDeps(pageOld)
    addDeps(pageNew)
  })
  pagesWatcher.on('unlink', async (filePathRelative) => {
    logger.info(`page ${chalk.magenta(filePathRelative)} is removed`)
    const page = await handlePageUnlink(app, app.dir.source(filePathRelative))
    if (page === null) return
    removeDeps(page)
  })

  return [pagesWatcher, depsWatcher]
}
