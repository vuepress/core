import { removeLeadingSlash } from '@vuepress/shared'
import { path } from '@vuepress/utils'

/**
 * Resolve relative and absolute paths according to the `base` and `filePathRelative`
 */
export const resolvePaths = (
  rawPath: string,
  base: string,
  filePathRelative: string | null,
): {
  absolutePath: string | null
  relativePath: string
} => {
  let absolutePath: string | null
  let relativePath: string

  // if raw path is absolute
  if (rawPath.startsWith('/')) {
    // if raw path is a link to markdown file
    if (rawPath.endsWith('.md')) {
      // prepend `base` to the link
      absolutePath = path.join(base, rawPath)
      relativePath = removeLeadingSlash(rawPath)
    }
    // if raw path is a link to other kind of file
    else {
      // keep the link as is
      absolutePath = rawPath
      relativePath = path.relative(base, absolutePath)
    }
  }
  // if raw path is relative
  // if `filePathRelative` is available
  else if (filePathRelative) {
    // resolve relative path according to `filePathRelative`
    relativePath = path.join(
      // file path may contain non-ASCII characters
      path.dirname(encodeURI(filePathRelative)),
      rawPath,
    )
    // resolve absolute path according to `base`
    absolutePath = path.join(base, relativePath)
  }
  // if `filePathRelative` is not available
  else {
    // remove leading './'
    relativePath = rawPath.replace(/^(?:\.\/)?(.*)$/, '$1')
    // just take relative link as absolute link
    absolutePath = null
  }

  return {
    absolutePath,
    relativePath,
  }
}
