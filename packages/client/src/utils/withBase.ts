import { isLinkHttp, removeLeadingSlash } from '@vuepress/shared'

/**
 * Prefix url with site base
 */
export const withBase = (url: string): string => {
  if (isLinkHttp(url)) return url
  return `${__VUEPRESS_BASE__}${removeLeadingSlash(url)}`
}
