import { isString } from '@vuepress/shared'
import type { HotKeyOptions } from '../../shared/index.js'

export const isKeyMatched = (
  event: KeyboardEvent,
  hotKeys: (string | HotKeyOptions)[]
): boolean =>
  hotKeys.some((item) => {
    if (isString(item)) {
      return item === event.key
    }

    const { key, ctrl = false, shift = false, alt = false } = item
    return (
      key === event.key &&
      ctrl === event.ctrlKey &&
      shift === event.shiftKey &&
      alt === event.altKey
    )
  })
