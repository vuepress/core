<script setup lang="ts">
import SidebarItem from '@theme/SidebarItem.vue'
import { useSidebarItems } from '../composables'

const sidebarItems = useSidebarItems()
</script>

<template>
  <ul v-if="sidebarItems.length" class="sidebar-items">
    <SidebarItem
      v-for="item in sidebarItems"
      :key="item.link || item.text"
      :item="item"
    />
  </ul>
</template>
