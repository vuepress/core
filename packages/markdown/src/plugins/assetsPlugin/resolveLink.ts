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

  // check if the link is relative path
  const isRelativePath = strict
    ? // in strict mode, only link that starts with `./` or `../` is considered as relative path
      /^\.{1,2}\//.test(link)
    : // in non-strict mode, link that does not start with `/` and does not have protocol is considered as relative path
      !link.startsWith('/') && !/[A-z]+:\/\//.test(link)

  // if the link is relative path, and the `env.filePathRelative` exists
  // add `@source` alias to the link
  if (isRelativePath && env.filePathRelative) {
    resolvedLink = `${relativePathPrefix}/${path.join(
      path.dirname(env.filePathRelative),
      resolvedLink
    )}`
  }

  return resolvedLink
}
