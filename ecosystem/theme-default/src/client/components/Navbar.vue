<script setup lang="ts">
import NavbarBrand from '@theme/NavbarBrand.vue'
import NavbarItems from '@theme/NavbarItems.vue'
import ToggleColorModeButton from '@theme/ToggleColorModeButton.vue'
import ToggleSidebarButton from '@theme/ToggleSidebarButton.vue'
import { computed, ref } from 'vue'
import { useThemeLocaleData } from '../composables/index.js'
import { DeviceType, updateDeviceStatus } from '../utils/index.js'

defineEmits(['toggle-sidebar'])

const themeLocale = useThemeLocaleData()

const navbar = ref<HTMLElement | null>(null)
const navbarBrand = ref<HTMLElement | null>(null)

const linksWrapperMaxWidth = ref(0)
const linksWrapperStyle = computed(() => {
  if (!linksWrapperMaxWidth.value) {
    return {}
  }
  return {
    maxWidth: linksWrapperMaxWidth.value + 'px',
  }
})

// avoid overlapping of long title and long navbar links
const handleLinksWrapWidth = (mobileDesktopBreakpoint: number): void => {
  const navbarHorizontalPadding =
    getCssValue(navbar.value, 'paddingLeft') +
    getCssValue(navbar.value, 'paddingRight')
  if (window.innerWidth < mobileDesktopBreakpoint) {
    linksWrapperMaxWidth.value = 0
  } else {
    linksWrapperMaxWidth.value =
      navbar.value!.offsetWidth -
      navbarHorizontalPadding -
      (navbarBrand.value?.offsetWidth || 0)
  }
}
updateDeviceStatus(DeviceType.MOBILE, handleLinksWrapWidth)

function getCssValue(el: HTMLElement | null, property: string): number {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const val = el?.ownerDocument?.defaultView?.getComputedStyle(el, null)?.[
    property
  ]
  const num = Number.parseInt(val, 10)
  return Number.isNaN(num) ? 0 : num
}
</script>

<template>
  <header ref="navbar" class="navbar">
    <ToggleSidebarButton @toggle="$emit('toggle-sidebar')" />

    <span ref="navbarBrand">
      <NavbarBrand />
    </span>

    <div class="navbar-items-wrapper" :style="linksWrapperStyle">
      <slot name="before" />
      <NavbarItems class="can-hide" />
      <slot name="after" />
      <ToggleColorModeButton v-if="themeLocale.colorModeSwitch" />
      <NavbarSearch />
    </div>
  </header>
</template>
