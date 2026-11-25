import type { MarkdownItPlugin } from '@mdit-vue/types'
import { inferRoutePath, isLinkExternal } from '@vuepress/shared'
import type { Token } from 'markdown-it'

import type { MarkdownEnv } from '../../types.js'
import { resolvePaths } from './resolvePaths.js'

export interface LinksPluginOptions {
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

  /**
   * Tag for internal links
   *
   * @default 'RouteLink'
   */
  internalTag?: 'a' | 'RouteLink' | 'RouterLink'

  /**
   * Method to check if a link is external
   *
   * @default import { isLinkExternal } from '@vuepress/shared'
   */
  isExternal?: (href: string, env: MarkdownEnv) => boolean
}

/**
 * Process links in markdown file
 *
 * - internal links: convert `<a>` tag into internalTag
 * - external links: add extra attrs
 */
export const linksPlugin: MarkdownItPlugin<LinksPluginOptions> = (
  md,
  options: LinksPluginOptions = {},
): void => {
  // tag of internal links
  const internalTag = options.internalTag || 'RouteLink'
  const isExternal =
    options.isExternal ?? ((href, env) => isLinkExternal(href, env.base))

  // attrs that going to be added to external links
  const externalAttrs = {
    target: '_blank',
    rel: 'noopener noreferrer',
    ...options.externalAttrs,
  }

  const handleLinkOpen = (token: Token, env: MarkdownEnv): boolean => {
    // get `href` attr index
    const hrefIndex = token.attrIndex('href')

    // if `href` attr does not exist, skip
    /* istanbul ignore if */
    if (hrefIndex < 0) {
      return false
    }

    // if `href` attr exists, `token.attrs` is not `null`
    const hrefAttr = token.attrs![hrefIndex]
    const hrefLink = String(hrefAttr[1])

    // get `base` and `filePathRelative` from `env`
    const { base = '/', filePathRelative = null } = env

    // check if a link is an external link
    if (isExternal(hrefLink, env)) {
      // set `externalAttrs` to current token
      Object.entries(externalAttrs).forEach(([key, val]) => {
        token.attrSet(key, val)
      })
      return false
    }

    // check if a link is an internal link
    const internalLinkMatch = hrefLink.match(
      /^([^#?]*?(?:\/|\.md|\.html))([#?].*)?$/,
    )

    if (!internalLinkMatch) {
      return false
    }

    // convert
    // <a href="hrefLink">
    // to
    // <RouteLink to="toProp">

    // notice that the path and hash are encoded by markdown-it
    const rawPath = internalLinkMatch[1]

    // The default slugification function processes anchor links (hash fragments)
    // If an anchor starts with a number (e.g., #123), it is replaced with #_number (e.g., #_123)
    // This rule is designed to prevent potential URL conflicts, though manually written anchors like #123 are rare in Markdown—hence the special handling.
    const rawHashAndQueries = (internalLinkMatch[2] || '').replace(
      /^#(\d)/,
      '#_$1',
    )

    // resolve relative and absolute path
    const { relativePath, absolutePath } = resolvePaths(
      rawPath,
      base,
      filePathRelative,
    )

    // whether the opening tag is converted into an internal link component
    let isConverted = false

    if (['RouterLink', 'RouteLink'].includes(internalTag)) {
      // convert starting tag of internal link to `internalTag`
      token.tag = internalTag
      // replace the original `href` attr with `to` attr
      hrefAttr[0] = 'to'
      // normalize markdown file path to route path
      // we are removing the `base` from absolute path because it should not be
      // passed to `<RouteLink>` or `<RouterLink>`
      // use string prefix check instead of a `RegExp`, because `base` is a URL
      // path that may contain regexp special characters, e.g. `(` or `+`
      const normalizedPath = inferRoutePath(
        absolutePath
          ? absolutePath.startsWith(base)
            ? `/${absolutePath.slice(base.length)}`
            : absolutePath
          : relativePath,
      )
      // replace the original href link with the normalized path
      hrefAttr[1] = `${normalizedPath}${rawHashAndQueries}`
      isConverted = true
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

    return isConverted
  }

  // Rewrite links of a single inline token in one pass over its children.
  //
  // The traversal only relies on the flat order of `link_open` / `link_close`
  // tokens, which is public markdown-it token semantics, instead of on the
  // identity of the internal token array. All the state lives in the local
  // stack below, so nothing can be shared across renders: a render that throws
  // in the middle of a link can never corrupt a later render.
  const rewriteInlineLinks = (children: Token[], env: MarkdownEnv): void => {
    // whether each opened link has been converted into an internal link
    const openInternalLinks: boolean[] = []

    children.forEach((token) => {
      if (token.type === 'link_open') {
        openInternalLinks.push(handleLinkOpen(token, env))
      } else if (token.type === 'link_close') {
        // rewrite the ending tag only when the matching opening tag has been
        // converted, otherwise keep the original tag
        if (openInternalLinks.pop() === true) {
          token.tag = internalTag
        }
      }
    })
  }

  // Rewrite links once the `inline` and `linkify` core rules have created all
  // link tokens. Pushing the rule appends it after markdown-it's built-in core
  // rules (normalize, block, inline, linkify, ..., text_join), and all state
  // stays within the render that `state` belongs to.
  md.core.ruler.push('vuepress_links', (state) => {
    state.tokens.forEach((token) => {
      if (token.type === 'inline' && token.children) {
        rewriteInlineLinks(token.children, state.env ?? {})
      }
    })
  })
}
