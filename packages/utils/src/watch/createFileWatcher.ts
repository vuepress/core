import type { ChokidarOptions, FSWatcher } from 'chokidar'
import chokidar from 'chokidar'

export type WatchEventType =
  | 'add'
  | 'addDir'
  | 'change'
  | 'unlink'
  | 'unlinkDir'
export type WatchEventListener = (filePath: string) => void

export interface FileWatcher {
  /**
   * The underlying chokidar FSWatcher instance
   */
  readonly watcher: FSWatcher

  /**
   * Add file paths to be watched
   */
  watch(...paths: (string | readonly string[])[]): void

  /**
   * Remove file paths from watching
   */
  unwatch(...paths: (string | readonly string[])[]): void

  /**
   * Listen for a specific event on watched files
   *
   * @returns A function to remove the listener
   */
  on(event: WatchEventType, listener: WatchEventListener): () => void

  /**
   * Close the watcher and release all resources
   */
  close(): Promise<void>
}

/**
 * Create a file watcher that can be shared across multiple consumers.
 *
 * Uses a single underlying chokidar instance to avoid duplicate `fs.watch`
 * calls for the same files. Multiple callers can `watch` / `unwatch` paths
 * and register listeners on the shared instance.
 */
export const createFileWatcher = (options?: ChokidarOptions): FileWatcher => {
  const fsWatcher = chokidar.watch([], {
    ignoreInitial: true,
    ...options,
  })

  return {
    get watcher() {
      return fsWatcher
    },

    watch(...paths) {
      const flatPaths = paths.flat().filter(Boolean)
      if (flatPaths.length > 0) {
        fsWatcher.add(flatPaths)
      }
    },

    unwatch(...paths) {
      const flatPaths = paths.flat().filter(Boolean)
      if (flatPaths.length > 0) {
        fsWatcher.unwatch(flatPaths)
      }
    },

    on(event, listener) {
      fsWatcher.on(event, listener)
      return () => {
        fsWatcher.off(event, listener)
      }
    },

    close() {
      return fsWatcher.close()
    },
  }
}
