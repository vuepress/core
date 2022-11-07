import type { App, Page } from '@vuepress/core'
import { colors, logger } from '@vuepress/utils'
import chokidar from 'chokidar'
import type { FSWatcher } from 'chokidar'
import { handlePageAdd } from './handlePageAdd.js'
import { handlePageChange } from './handlePageChange.js'
import { handlePageUnlink } from './handlePageUnlink.js'
import { createPageDepsHelper } from './pageDepsHelper.js'

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
        `dependency of page ${colors.magenta(filePathRelative)} is modified`
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
    logger.info(`page ${colors.magenta(filePathRelative)} is created`)
    const page = await handlePageAdd(app, app.dir.source(filePathRelative))
    if (page === null) return
    addDeps(page)
  })
  pagesWatcher.on('change', async (filePathRelative) => {
    logger.info(`page ${colors.magenta(filePathRelative)} is modified`)
    const result = await handlePageChange(app, app.dir.source(filePathRelative))
    if (result === null) return
    const [pageOld, pageNew] = result
    removeDeps(pageOld)
    addDeps(pageNew)
  })
  pagesWatcher.on('unlink', async (filePathRelative) => {
    logger.info(`page ${colors.magenta(filePathRelative)} is removed`)
    const page = await handlePageUnlink(app, app.dir.source(filePathRelative))
    if (page === null) return
    removeDeps(page)
  })

  return [pagesWatcher, depsWatcher]
}
