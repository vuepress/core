import { isLinkFtp } from './isLinkFtp.js'
import { isLinkHttp } from './isLinkHttp.js'

const markdownLinkRegexp = /.md((\?|#).*)?$/

/**
 * Determine a link is external or not
 */
export const isLinkExternal = (link: string, base = '/'): boolean => {
  // http link or ftp link
  if (isLinkHttp(link) || isLinkFtp(link)) {
    return true
  }

  // absolute link that does not start with `base` and does not end with `.md`
  if (
    link.startsWith('/') &&
    !link.startsWith(base) &&
    !markdownLinkRegexp.test(link)
  ) {
    return true
  }

  return false
}
