import { onMounted, onUnmounted, ref } from 'vue'
import type { Ref } from 'vue'

export const usePrefersColorScheme = (isDarkMode: Ref<boolean>): void => {
  const mediaQuery = ref<MediaQueryList | null>(null)
  const onMediaQueryChange = (event: MediaQueryListEvent): void => {
    isDarkMode.value = event.matches
  }

  onMounted(() => {
    // get `prefers-color-scheme` media query and set the initial mode
    mediaQuery.value = window.matchMedia('(prefers-color-scheme: dark)')
    isDarkMode.value = mediaQuery.value.matches

    // watch changes
    mediaQuery.value.addEventListener('change', onMediaQueryChange)
  })

  onUnmounted(() => {
    mediaQuery.value?.removeEventListener('change', onMediaQueryChange)
  })
}
