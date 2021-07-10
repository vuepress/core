import { path } from '@vuepress/utils'
import { decode } from 'mdurl'
import type { MarkdownEnv } from '../../types'

export const resolveLink = (
  link: string,
  relativePathPrefix: string,
  env: MarkdownEnv
): string => {
  // decode link to ensure bundler can find the file correctly
  let resolvedLink = decode(link)

  // if the link is relative path, and the `env.filePathRelative` exists
  // add `@source` alias to the link
  if (/^\.{1,2}\//.test(link) && env.filePathRelative) {
    resolvedLink = `${relativePathPrefix}/${path.join(
      path.dirname(env.filePathRelative),
      resolvedLink
    )}`
  }

  return resolvedLink
}
