import { onMounted, onUnmounted } from 'vue'

/**
 * Add hotkey listener, remove it after triggered
 */
export const useDocsearchHotkeyListener = (callback: () => void): void => {
  const hotkeyListener = (event: KeyboardEvent): void => {
    if (event.key === 'k' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault()
      window.removeEventListener('keydown', hotkeyListener)
      callback()
    }
  }
  onMounted(() => window.addEventListener('keydown', hotkeyListener))
  onUnmounted(() => window.removeEventListener('keydown', hotkeyListener))
}
