import { pathToFileURL } from 'node:url'

/**
 * A helper for dynamically importing a file path
 *
 * We need to use `pathToFileURL` to transform file path wo compat with windows
 */
export const importFile = async <T>(filePath: string): Promise<T> =>
  import(pathToFileURL(filePath).toString()) as Promise<T>

/**
 * A wrapper of `importFile` and returns the default export
 */
export const importFileDefault = async <T>(filePath: string): Promise<T> =>
  importFile<{ default: T }>(filePath).then((m) => m.default)
