import { inferRoutePath, isLinkExternal } from '@vuepress/shared'
import type { PluginWithOptions } from 'markdown-it'
import type Token from 'markdown-it/lib/token.mjs'
import type { MarkdownEnv } from '../../types.js'
import { resolvePaths } from './resolvePaths.js'

export interface LinksPluginOptions {
  /**
   * Tag for internal links
   *
   * @default 'RouteLink'
   */
  internalTag?: 'a' | 'RouteLink' | 'RouterLink'

  /**
   * Additional attributes for external links
   *
   * @default
   * ```js
   * ({
   *   target: '_blank',
   *   rel: 'noopener noreferrer',
   * })
   * ```
   */
  externalAttrs?: Record<string, string>
}

/**
 * Process links in markdown file
 *
 * - internal links: convert `<a>` tag into internalTag
 * - external links: add extra attrs
 */
export const linksPlugin: PluginWithOptions<LinksPluginOptions> = (
  md,
  options: LinksPluginOptions = {},
): void => {
  // tag of internal links
  const internalTag = options.internalTag || 'RouteLink'

  // attrs that going to be added to external links
  const externalAttrs = {
    target: '_blank',
    rel: 'noopener noreferrer',
    ...options.externalAttrs,
  }

  let hasOpenInternalLink = false

  const handleLinkOpen = (
    tokens: Token[],
    idx: number,
    env: MarkdownEnv,
  ): void => {
    // get current token
    const token = tokens[idx]

    // get `href` attr index
    const hrefIndex = token.attrIndex('href')

    // if `href` attr does not exist, skip
    /* istanbul ignore if */
    if (hrefIndex < 0) {
      return
    }

    // if `href` attr exists, `token.attrs` is not `null`
    const hrefAttr = token.attrs![hrefIndex]
    const hrefLink: string = hrefAttr[1]

    // get `base` and `filePathRelative` from `env`
    const { base = '/', filePathRelative = null } = env

    // check if a link is an external link
    if (isLinkExternal(hrefLink, base)) {
      // set `externalAttrs` to current token
      Object.entries(externalAttrs).forEach(([key, val]) =>
        token.attrSet(key, val),
      )
      return
    }

    // check if a link is an internal link
    const internalLinkMatch = hrefLink.match(
      /^([^#?]*?(?:\/|\.md|\.html))([#?].*)?$/,
    )

    if (!internalLinkMatch) {
      return
    }

    // convert
    // <a href="hrefLink">
    // to
    // <RouteLink to="toProp">

    // notice that the path and hash are encoded by markdown-it
    const rawPath = internalLinkMatch[1]
    const rawHashAndQueries = internalLinkMatch[2] || ''

    // resolve relative and absolute path
    const { relativePath, absolutePath } = resolvePaths(
      rawPath,
      base,
      filePathRelative,
    )

    if (['RouterLink', 'RouteLink'].includes(internalTag)) {
      // convert starting tag of internal link to `internalTag`
      token.tag = internalTag
      // replace the original `href` attr with `to` attr
      hrefAttr[0] = 'to'
      // normalize markdown file path to route path
      // we are removing the `base` from absolute path because it should not be
      // passed to `<RouteLink>` or `<RouterLink>`
      const normalizedPath = inferRoutePath(
        absolutePath
          ? absolutePath.replace(new RegExp(`^${base}`), '/')
          : relativePath,
      )
      // replace the original href link with the normalized path
      hrefAttr[1] = `${normalizedPath}${rawHashAndQueries}`
      // set `hasOpenInternalLink` to modify the ending tag
      hasOpenInternalLink = true
    } else {
      const normalizedPath = inferRoutePath(absolutePath ?? relativePath)
      // replace the original href link with the normalized path
      hrefAttr[1] = `${normalizedPath}${rawHashAndQueries}`
    }

    // extract internal links for file / page existence check
    ;(env.links ??= []).push({
      raw: hrefLink,
      relative: relativePath,
      absolute: absolutePath,
    })
  }

  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    handleLinkOpen(tokens, idx, env)
    return self.renderToken(tokens, idx, options)
  }

  md.renderer.rules.link_close = (tokens, idx, options, env, self) => {
    // convert ending tag of internal link
    if (hasOpenInternalLink) {
      hasOpenInternalLink = false
      tokens[idx].tag = internalTag
    }
    return self.renderToken(tokens, idx, options)
  }
}
