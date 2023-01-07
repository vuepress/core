// eslint-disable-next-line vue/prefer-import-from-vue
import { isString } from '@vue/shared'

/**
 * Whether a link is a valid pathname
 */
export const isLinkPathname = (test: unknown): boolean =>
  isString(test) && test.startsWith('/')
