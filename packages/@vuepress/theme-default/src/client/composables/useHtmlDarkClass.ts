import { onMounted, onUnmounted, watch } from 'vue'
import type { Ref } from 'vue'

export const useHtmlDarkClass = (isDarkMode: Ref<boolean>): void => {
  const updateDarkModeClass = (value = isDarkMode.value): void => {
    // set `class="dark"` on `<html>` element
    const htmlEl = window?.document.querySelector('html')
    htmlEl?.classList.toggle('dark', value)
  }

  onMounted(() => {
    watch(isDarkMode, updateDarkModeClass, { immediate: true })
  })

  onUnmounted(() => {
    updateDarkModeClass(false)
  })
}
