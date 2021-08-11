<template>
  <aside class="sidebar">
    <NavbarLinks />

    <slot name="top" />

    <ul class="sidebar-links">
      <SidebarChild
        v-for="item in sidebarItems"
        :key="item.link || item.text"
        :item="item"
      />
    </ul>

    <slot name="bottom" />
  </aside>
</template>

<script setup lang="ts">
import { useSidebarItems } from '../composables'
import NavbarLinks from './NavbarLinks.vue'
import { SidebarChild } from './SidebarChild'

const sidebarItems = useSidebarItems()
</script>
