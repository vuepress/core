<script setup lang="ts">
import NavbarLinks from './NavbarLinks.vue'
import SidebarItems from './SidebarItems.vue'
</script>

<template>
  <aside class="sidebar">
    <NavbarLinks />
    <slot name="top" />
    <SidebarItems />
    <slot name="bottom" />
  </aside>
</template>
