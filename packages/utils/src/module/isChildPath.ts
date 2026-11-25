import path from 'upath'

const WINDOWS_ABSOLUTE_PATH_PATTERN = /^(?:[a-zA-Z]:[\\/]|[\\/]{2})/

interface ResolvedPath {
  flavor: 'posix' | 'win32'
  value: string
}

/**
 * Check if the path is an absolute Windows path (drive letter or UNC path).
 *
 * Notice that we check the raw path, because `upath.normalize` would convert
 * the UNC prefix `\\` into a single forward slash.
 */
const isWindowsAbsolutePath = (filePath: string): boolean =>
  WINDOWS_ABSOLUTE_PATH_PATTERN.test(filePath)

/**
 * Normalize the path and resolve it to an absolute path.
 *
 * Relative paths are resolved against the current working directory, which is
 * the same convention as `path.resolve`. Windows-style paths are supported on
 * every platform.
 */
const resolvePath = (filePath: string): ResolvedPath => {
  // check the raw path before `upath.normalize` strips the UNC prefix
  if (isWindowsAbsolutePath(filePath)) {
    return {
      flavor: 'win32',
      value: path.win32.normalize(filePath),
    }
  }

  const normalizedPath = path.normalize(filePath)

  if (path.posix.isAbsolute(normalizedPath)) {
    return {
      flavor: 'posix',
      value: path.posix.normalize(normalizedPath),
    }
  }

  // relative paths are resolved against the cwd of the running process
  const resolvedPath = path.resolve(normalizedPath)

  return isWindowsAbsolutePath(resolvedPath)
    ? {
        flavor: 'win32',
        value: path.win32.normalize(resolvedPath),
      }
    : {
        flavor: 'posix',
        value: path.posix.normalize(resolvedPath),
      }
}

/**
 * Check if `child` is a sub path of `parent` or not. Return `true` if
 * they are the same path.
 *
 * Relative paths are resolved against the current working directory.
 * Windows-style paths (drive letters, UNC paths and backslashes) and
 * posix-style paths are supported on every platform.
 */
export const isChildPath = (child: string, parent: string): boolean => {
  const childPath = resolvePath(child)
  const parentPath = resolvePath(parent)

  if (childPath.flavor !== parentPath.flavor) {
    return false
  }

  if (childPath.flavor === 'win32') {
    const relativePath = path.win32.relative(parentPath.value, childPath.value)
    return (
      relativePath === '' ||
      (!path.win32.isAbsolute(relativePath) &&
        relativePath !== '..' &&
        !relativePath.startsWith('..\\'))
    )
  }

  const relativePath = path.posix.relative(parentPath.value, childPath.value)
  return (
    relativePath === '' ||
    (!path.posix.isAbsolute(relativePath) &&
      relativePath !== '..' &&
      !relativePath.startsWith('../'))
  )
}
