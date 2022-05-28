import type { PluginWithOptions } from 'markdown-it'
import type {
  MarkdownEnv,
  MarkdownHeader,
  MarkdownSlugifyFunction,
} from '../types'
import { resolveHeadersFromTokens, vuepressSlugify } from '../utils'

export interface ExtractHeadersPluginOptions {
  /**
   * Heading level that going to be extracted to the `env`
   *
   * Should be a subset of markdown-it-anchor's `level` option
   * to ensure the link is existed
   */
  level?: number[]

  /**
   * A custom slugify function
   *
   * Should use the same slugify function with markdown-it-anchor
   * to ensure the link is matched
   */
  slugify?: MarkdownSlugifyFunction

  /**
   * A function for formatting headers
   */
  format?: (str: string) => string
}

/**
 * Extracting markdown headers to env
 *
 * Would be used for generating sidebar nav and toc
 */
export const extractHeadersPlugin: PluginWithOptions<
  ExtractHeadersPluginOptions
> = (
  md,
  {
    level = [2, 3],
    slugify = vuepressSlugify,
    format,
  }: ExtractHeadersPluginOptions = {}
): void => {
  let headers: MarkdownHeader[]

  // push the rule to the end of the chain
  // resolve headers from the parsed tokens
  md.core.ruler.push('resolveExtractHeaders', (state) => {
    headers = resolveHeadersFromTokens(state.tokens, {
      level,
      allowHtml: false,
      escapeText: false,
      slugify,
      format,
    })
    return true
  })

  // extract headers to env
  const render = md.render.bind(md)
  md.render = (src, env: MarkdownEnv = {}) => {
    const result = render(src, env)
    env.headers = headers
    return result
  }
}
