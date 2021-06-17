import { computed, onMounted, onUnmounted, watch } from 'vue'
import type { Ref } from 'vue'
import { useSiteLocaleData } from '@vuepress/client'
import { isString } from '@vuepress/shared'

const getBgColor = (): string =>
  window
    .getComputedStyle(window.document.documentElement)
    .getPropertyValue('--c-bg')
    .trim()

export const useMetaThemeColor = (isDarkMode: Ref<boolean>): void => {
  const siteLocale = useSiteLocaleData()

  const themeColorHead = computed(() =>
    siteLocale.value.head.find(
      ([tag, { name, content }]) =>
        tag === 'meta' && name === 'theme-color' && isString(content)
    )
  )
  const themeColorHeadContent = computed<string | null>(
    () => (themeColorHead.value?.[1].content as string) ?? null
  )

  const updateMetaThemeColor = (color = themeColorHeadContent.value): void => {
    if (color) {
      window?.document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', color)
    }
  }

  onMounted(() => {
    watch(
      isDarkMode,
      () => {
        if (!isDarkMode.value) {
          updateMetaThemeColor(getBgColor())
        } else {
          updateMetaThemeColor()
        }
      },
      { immediate: true }
    )
  })

  onUnmounted(() => {
    updateMetaThemeColor()
  })
}
