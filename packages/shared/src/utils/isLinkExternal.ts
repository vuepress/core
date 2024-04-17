import { isLinkWithProtocol } from './isLinkWithProtocol.js'

const markdownLinkRegexp = /.md((\?|#).*)?$/

/**
 * Determine a link is external or not
 */
export const isLinkExternal = (link: string, base = '/'): boolean =>
  isLinkWithProtocol(link) ||
  // absolute link that does not start with `base` and does not end with `.md`
  (link.startsWith('/') &&
    !link.startsWith(base) &&
    !markdownLinkRegexp.test(link))
