/**
 * Normalize the given path to the final route path
 */
export const normalizeRoutePath = (path: string): string => {
  const convertedMdPath = path.endsWith('README.md')
    ? path.substring(0, path.length - 9)
    : path.endsWith('.md')
      ? path.substring(0, path.length - 3) + '.html'
      : path

  return convertedMdPath.endsWith('/index.html')
    ? convertedMdPath.substring(0, convertedMdPath.length - 10)
    : convertedMdPath.endsWith('.html') || convertedMdPath.endsWith('/')
      ? convertedMdPath
      : convertedMdPath + '.html'
}
