<template>
  <div
    class="toggle-sidebar-button"
    :title="title"
    aria-expanded="false"
    role="button"
    tabindex="0"
    @click="$emit('toggle')"
  >
    <div class="icon" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useThemeLocaleData } from '../composables'

export default defineComponent({
  name: 'ToggleSidebarButton',

  emits: ['toggle'],

  setup() {
    const title = computed(() => {
      const themeLocale = useThemeLocaleData()
      return themeLocale.value.sidebarButtonText || 'Toggle Sidebar'
    })

    return {
      title,
    }
  },
})
</script>
