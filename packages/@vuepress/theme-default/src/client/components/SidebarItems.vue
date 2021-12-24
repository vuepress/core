<script setup lang="ts">
import { useSidebarItems } from '../composables'
import SidebarItem from './SidebarItem.vue'

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
