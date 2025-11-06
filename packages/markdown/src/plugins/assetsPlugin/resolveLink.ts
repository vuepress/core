import { path } from '@vuepress/utils'
import { decode } from 'mdurl'
import type { MarkdownEnv } from '../../types.js'

interface ResolveLinkOptions {
  env: MarkdownEnv
  absolutePathPrependBase?: boolean
  strict?: boolean
}

export const resolveLink = (
  link: string,
  { env, absolutePathPrependBase = false }: ResolveLinkOptions,
): string => {
  // do not resolve data uri
  if (link.startsWith('data:')) return link

  // decode link to ensure bundler can find the file correctly
  let resolvedLink = decode(link)

  // prepend base to absolute path if needed
  if (absolutePathPrependBase && env.base && link.startsWith('/')) {
    resolvedLink = path.join(env.base, resolvedLink)
  }

  return resolvedLink
}
