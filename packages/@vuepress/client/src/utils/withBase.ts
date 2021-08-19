import { isLinkHttp, removeLeadingSlash } from '@vuepress/shared'
import { useSiteData } from '../composables'

/**
 * Prefix url with site base
 */
export const withBase = (url: string): string => {
  if (isLinkHttp(url)) return url
  const base = useSiteData().value.base
  return `${base}${removeLeadingSlash(url)}`
}
