<script setup lang="ts">
import NavbarItems from './NavbarItems.vue'
import SidebarItems from './SidebarItems.vue'
</script>

<template>
  <aside class="sidebar">
    <NavbarItems />
    <slot name="top" />
    <SidebarItems />
    <slot name="bottom" />
  </aside>
</template>
