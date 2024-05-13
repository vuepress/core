import { sanitizeFileName } from './sanitizeFileName.js'

/**
 * Transforms a path to a file name, replacing slashes with underscores
 */
export const transformPathToFileName = (rawPath: string): string =>
  sanitizeFileName(rawPath.replace(/\//g, '_'))
