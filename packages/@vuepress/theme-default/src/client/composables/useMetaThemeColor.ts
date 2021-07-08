import { computed, onMounted, onUnmounted, watch } from 'vue'
import type { Ref } from 'vue'
import { useSiteData, createHeadTag } from '@vuepress/client'
import { useThemeData } from '.'
import { HeadConfig, isString } from '@vuepress/shared'

export const useMetaThemeColor = (isDarkMode: Ref<boolean>): void => {
  const siteData = useSiteData()
  const themeData = useThemeData()

  const enableThemeColor = computed(() => themeData.value.themeColor)
  const themeColorLight = computed<string | null>(
    () => (themeData.value.themeColorLight as string) ?? null
  )
  const themeColorDark = computed<string | null>(
    () => (themeData.value.themeColorDark as string) ?? null
  )
  const themeColorHeadIdx = computed(() =>
    siteData.value.head.findIndex(
      ([tag, { name, content }]) =>
        tag === 'meta' && name === 'theme-color' && isString(content)
    )
  )
  const headConfig: HeadConfig = ['meta', { name: 'theme-color', content: '' }]

  const setSiteDataHead = (color = themeColorLight.value): void => {
    if (color && enableThemeColor.value && themeColorHeadIdx.value === -1) {
      headConfig[1].content = color
      siteData.value.head.push(headConfig)
    }
  }

  const setMetaThemeColor = (color = themeColorLight.value): void => {
    if (color && enableThemeColor.value) {
      headConfig[1].content = color
      const headTag = createHeadTag(headConfig)
      if (headTag) {
        window?.document.head.appendChild(headTag)
      }
    }
  }

  const updateSiteDataHead = (color = themeColorLight.value): void => {
    if (color && themeColorHeadIdx.value !== -1) {
      headConfig[1].content = color
      siteData.value.head[themeColorHeadIdx.value] = headConfig
    }
  }

  const updateMetaThemeColor = (color = themeColorLight.value): void => {
    if (color) {
      window?.document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', color)
    }
  }

  onMounted(() => {
    setSiteDataHead()
    setMetaThemeColor()
    watch(
      isDarkMode,
      () => {
        if (isDarkMode.value) {
          updateSiteDataHead(themeColorDark.value)
          updateMetaThemeColor(themeColorDark.value)
        } else {
          updateSiteDataHead()
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
