import { removeLeadingSlash } from '@vuepress/shared'
import { path } from '@vuepress/utils'

/**
 * Resolve relative and absolute paths according to the `base` and `filePathRelative`
 */
export const resolvePaths = (
  rawPath: string,
  base: string,
  filePathRelative: string | null
): {
  absolutePath: string
  relativePath: string
} => {
  let absolutePath: string
  let relativePath: string

  if (rawPath.startsWith('/')) {
    // if raw path is absolute

    if (rawPath.endsWith('.md')) {
      // if raw path is a link to markdown file

      // prepend `base` to the link
      absolutePath = path.join(base, rawPath)
      relativePath = removeLeadingSlash(rawPath)
    } else {
      // if raw path is a link to other kind of file

      // keep the link as is
      absolutePath = rawPath
      relativePath = path.relative(base, absolutePath)
    }
  } else {
    // if raw path is relative
    if (filePathRelative) {
      // if `filePathRelative` is available

      // resolve relative path according to `filePathRelative`
      relativePath = path.join(
        // file path may contain non-ASCII characters
        path.dirname(encodeURI(filePathRelative)),
        rawPath
      )
      // resolve absolute path according to `base`
      absolutePath = path.join(base, relativePath)
    } else {
      // if `filePathRelative` is not available

      // remove leading './'
      relativePath = rawPath.replace(/^(?:\.\/)?(.*)$/, '$1')
      // just take relative link as absolute link
      absolutePath = relativePath
    }
  }

  return {
    absolutePath,
    relativePath,
  }
}
