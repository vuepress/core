import { path } from '@vuepress/utils'
import { decode } from 'mdurl'

import type { MarkdownEnv } from '../../types.js'

interface ResolveLinkOptions {
  env: MarkdownEnv
  absolutePathPrependBase?: boolean,
  aliasSupport?: boolean | '@-prefix',
}

export const resolveLink = (
  link: string,
  {
    env,
    absolutePathPrependBase = false,
    aliasSupport = true,
  }: ResolveLinkOptions,
): string => {
  // do not resolve data uri
  if (link.startsWith('data:')) return link

  // decode link to ensure bundler can find the file correctly
  let resolvedLink = decode(link)

  // handle alias support
  if (aliasSupport !== true) {
    const hasPrefix = link.startsWith('/') || link.startsWith('./') || link.startsWith('../') || /[A-Za-z]+:\/\//.test(link)
    if (!hasPrefix) {
      if (aliasSupport === false) {
        resolvedLink = `./${resolvedLink}`
      }
      else if (!link.startsWith('@')) {
        resolvedLink = `./${resolvedLink}`
      }
    }
  }

  // prepend base to absolute path if needed
  if (absolutePathPrependBase && env.base && link.startsWith('/')) {
    resolvedLink = path.join(env.base, resolvedLink)
  }

  return resolvedLink
}
