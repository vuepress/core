import { path } from '@vuepress/utils'
import { decode } from 'mdurl'
import type { MarkdownEnv } from '../../types.js'

interface ResolveLinkOptions {
  env: MarkdownEnv
  absolutePathPrependBase?: boolean
  relativePathPrefix: string
  strict?: boolean | '@-perfix'
}

export const resolveLink = (
  link: string,
  {
    env,
    absolutePathPrependBase = false,
    relativePathPrefix,
    strict = false,
  }: ResolveLinkOptions,
): string => {
  // do not resolve data uri
  if (link.startsWith('data:')) return link

  // decode link to ensure bundler can find the file correctly
  let resolvedLink = decode(link)

  // check if the link is relative path
  const isRelativePath =
    strict === true
      ? /^\.{1,2}\//.test(link)
      : strict === false
        ? !link.startsWith('/') && !/[A-z]+:\/\//.test(link)
        : !link.startsWith('/') &&
          !link.startsWith('@') &&
          !/[A-z]+:\/\//.test(link)

  // if the link is relative path, and the `env.filePathRelative` exists
  // add `@source` alias to the link
  if (isRelativePath && env.filePathRelative) {
    resolvedLink = `${relativePathPrefix}/${path.join(
      path.dirname(env.filePathRelative),
      resolvedLink,
    )}`
  }

  // prepend base to absolute path if needed
  if (absolutePathPrependBase && env.base && link.startsWith('/')) {
    resolvedLink = path.join(env.base, resolvedLink)
  }

  return resolvedLink
}
