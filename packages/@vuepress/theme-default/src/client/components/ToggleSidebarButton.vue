<template>
  <div
    class="toggle-sidebar-button"
    :title="themeLocale.toggleSidebar || 'Toggle Sidebar'"
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

<script setup lang="ts">
import { defineEmits } from 'vue'
import { useThemeLocaleData } from '../composables'

defineEmits(['toggle'])

const themeLocale = useThemeLocaleData()
</script>
