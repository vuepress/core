import { sanitizePathSegment } from './sanitizePathSegment.js'

/**
 * Transforms a path to a file name, replacing path separators with underscores
 *
 * This is meant for names which are not used as paths, e.g. chunk names.
 */
export const transformPathToFileName = (rawPath: string): string =>
  sanitizePathSegment(rawPath.replace(/[\\/]/g, '_'))
