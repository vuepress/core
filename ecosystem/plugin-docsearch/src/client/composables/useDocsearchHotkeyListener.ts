import { useEventListener } from '@vueuse/core'

/**
 * Add hotkey listener, remove it after triggered
 */
export const useDocsearchHotkeyListener = (callback: () => void): void => {
  const remove = useEventListener('keydown', (event) => {
    if (event.key === 'k' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault()
      callback()
      remove()
    }
  })
}
