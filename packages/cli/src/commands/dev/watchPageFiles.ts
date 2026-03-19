import type { App, Page } from '@vuepress/core'
import { colors, logger, path, picomatch } from '@vuepress/utils'
import type { FSWatcher } from 'chokidar'
import chokidar from 'chokidar'

import { handlePageAdd } from './handlePageAdd.js'
import { handlePageChange } from './handlePageChange.js'
import { handlePageUnlink } from './handlePageUnlink.js'
import { createPageDepsHelper } from './pageDepsHelper.js'

type PageEventType = 'add' | 'change' | 'unlink'

/**
 * Merge pending events into final operation.
 */
const mergeEvents = (events: PageEventType[]): PageEventType | null => {
  if (events.length === 0) return null

  if (events.length === 1) return events[0]

  const first = events[0]
  const last = events[events.length - 1]

  // add + ... + remove: nothing
  if (first === 'add' && last === 'unlink') return null

  if (first === 'add') return 'add'
  if (last === 'unlink') return 'unlink'

  return 'change'
}

/**
 * Watch page files and deps, return file watchers and cleanup function
 */
export const watchPageFiles = (
  app: App,
): {
  watchers: FSWatcher[]
  cleanup: () => Promise<void>
} => {
  // Track pending events per page - just event types, no I/O
  const pendingEvents = new Map<string, PageEventType[]>()

  // Track the last promise per page for serialization
  const pagePromises = new Map<string, Promise<void>>()

  // watch page deps
  const depsWatcher = chokidar.watch([], {
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

  // Process pending events for a page, merging them into one final operation
  const processPageEvents = async (filePathRelative: string): Promise<void> => {
    // Get and clear pending events for this page
    const events = pendingEvents.get(filePathRelative) ?? []
    pendingEvents.delete(filePathRelative)

    // Merge events into final operation
    const finalEvent = mergeEvents(events)
    if (!finalEvent) return

    const filePath = app.dir.source(filePathRelative)

    if (finalEvent === 'add') {
      logger.info(`page ${colors.magenta(filePathRelative)} is created`)
      const page = await handlePageAdd(app, filePath)
      if (page === null) return
      addDeps(page)
      return
    }

    if (finalEvent === 'change') {
      logger.info(`page ${colors.magenta(filePathRelative)} is modified`)
      const result = await handlePageChange(app, filePath)
      if (result === null) return
      const [pageOld, pageNew] = result
      removeDeps(pageOld)
      addDeps(pageNew)
      return
    }

    // finalEvent is 'unlink'
    logger.info(`page ${colors.magenta(filePathRelative)} is removed`)
    const page = await handlePageUnlink(app, filePath)
    if (page === null) return
    removeDeps(page)
  }

  // Handle file events - just track them, no processing yet
  const pageEventHandler = (
    filePathRelative: string,
    eventType: PageEventType,
  ): void => {
    // Add event to pending list
    let events = pendingEvents.get(filePathRelative)
    if (!events) pendingEvents.set(filePathRelative, (events = []))
    events.push(eventType)

    // Chain to existing promise to ensure serialization
    const existingPromise =
      pagePromises.get(filePathRelative) ?? Promise.resolve()
    const newPromise = (async () => {
      try {
        await existingPromise
      } catch (error) {
        logger.error(
          `Error while processing page events for ${colors.magenta(filePathRelative)}:`,
          error,
        )
      } finally {
        await processPageEvents(filePathRelative)
      }
    })().finally(() => pagePromises.delete(filePathRelative))
    pagePromises.set(filePathRelative, newPromise)
  }

  // When a dependency changes, find all pages that depend on it and trigger change event for them
  const depsListener = (dep: string): void => {
    const pagePaths = depsHelper.get(dep)
    for (const filePathRelative of pagePaths) {
      logger.info(
        `dependency of page ${colors.magenta(filePathRelative)} is modified`,
      )
      pageEventHandler(filePathRelative, 'change')
    }
  }
  depsWatcher.on('add', depsListener)
  depsWatcher.on('change', depsListener)
  depsWatcher.on('unlink', depsListener)
  app.pages.forEach((page) => {
    addDeps(page)
  })

  // watch page files
  const pagePatterns: string[] = []
  const ignorePatterns: string[] = []
  for (const pattern of app.options.pagePatterns) {
    if (pattern.startsWith('!')) {
      ignorePatterns.push(pattern.slice(1))
    } else {
      pagePatterns.push(pattern)
    }
  }
  const sourceDir = app.dir.source()
  const tempDir = app.dir.temp()
  const cacheDir = app.dir.cache()
  const ignoreMatcher = picomatch(ignorePatterns, { cwd: sourceDir })
  const pageMatcher = picomatch(pagePatterns, { cwd: sourceDir })
  const pagesWatcher = chokidar.watch('.', {
    cwd: sourceDir,
    ignored: (filepath, stats) => {
      const relative = path.relative(sourceDir, filepath)

      // This is important so that folders like node_modules will be ignored immediately without traversing their children
      if (ignoreMatcher(relative)) {
        return true
      }

      // ignore internal temp and cache directories
      if (filepath === tempDir || filepath === cacheDir) {
        return true
      }

      // ignore non-matched files
      return !!stats?.isFile() && !pageMatcher(relative)
    },
    ignoreInitial: true,
  })

  pagesWatcher.on('add', (filePathRelative) => {
    pageEventHandler(filePathRelative, 'add')
  })
  pagesWatcher.on('change', (filePathRelative) => {
    pageEventHandler(filePathRelative, 'change')
  })
  pagesWatcher.on('unlink', (filePathRelative) => {
    pageEventHandler(filePathRelative, 'unlink')
  })

  // flush all pending page operations and reset
  const cleanup = async (): Promise<void> => {
    // clear pending events
    pendingEvents.clear()
    // wait for all pending page operations to finish
    await Promise.all(pagePromises.values())
    // clear pending promises
    pagePromises.clear()
  }

  return {
    watchers: [pagesWatcher, depsWatcher],
    cleanup,
  }
}
