import { path } from '@vuepress/utils'
import { decode } from 'mdurl'
import type { MarkdownEnv } from '../../types.js'

export const resolveLink = (
  link: string,
  relativePathPrefix: string,
  env: MarkdownEnv,
  strict = false
): string => {
  // decode link to ensure bundler can find the file correctly
  let resolvedLink = decode(link)

  // if the link is relative path, and the `env.filePathRelative` exists
  // add `@source` alias to the link
  if (
    (strict
      ? // only link starts with `./` or `../`
        /^\.{1,2}\//.test(link)
      : // link without protocol and not absolute links
        !link.startsWith('/') && !/[A-z]+:\/\//.test(link)) &&
    env.filePathRelative
  ) {
    resolvedLink = `${relativePathPrefix}/${path.join(
      path.dirname(env.filePathRelative),
      resolvedLink
    )}`
  }

  return resolvedLink
}
