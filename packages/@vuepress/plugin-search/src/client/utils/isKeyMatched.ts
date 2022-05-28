import { isString } from '@vuepress/shared'
import type { HotKeyOptions } from '../../shared'

export const isKeyMatched = (
  event: KeyboardEvent,
  hotKeys: (string | HotKeyOptions)[]
): boolean =>
  hotKeys.some((hotKey) => {
    if (isString(hotKey)) {
      return hotKey === event.key
    }

    const { key, ctrl = false, shift = false, alt = false } = hotKey
    return (
      key === event.key &&
      ctrl === event.ctrlKey &&
      shift === event.shiftKey &&
      alt === event.altKey
    )
  })
