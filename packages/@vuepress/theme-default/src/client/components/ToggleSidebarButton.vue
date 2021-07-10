<template>
  <div class="toggle-sidebar-button" :title="title" @click="$emit('toggle')">
    <svg
      class="icon"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      viewBox="0 0 448 512"
    >
      <path
        fill="currentColor"
        d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"
      />
    </svg>
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
