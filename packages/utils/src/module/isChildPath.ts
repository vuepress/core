import path from 'upath'

/**
 * Check if `child` is a sub path of `parent` or not. Return `true` if
 * they are the same path
 */
export const isChildPath = (child: string, parent: string): boolean => {
  const childPath = path.normalize(child)
  const parentPath = path.normalize(parent)
  // path.win32.isAbsolute could check both win32 and posix absolute path correctly
  if (!path.win32.isAbsolute(childPath) || !path.win32.isAbsolute(parentPath)) {
    return false
  }
  const relativePath = path.relative(parentPath, childPath)
  return relativePath === '' || !relativePath.startsWith('..')
}
