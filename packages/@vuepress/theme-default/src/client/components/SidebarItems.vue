<script setup lang="ts">
import SidebarItem from '@theme/SidebarItem.vue'
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useSidebarItems } from '../composables'

const route = useRoute()
const sidebarItems = useSidebarItems()

onMounted(() => {
  watch(
    () => route.hash,
    (hash) => {
      // get the sidebar DOM
      const sidebar = document.querySelector('.sidebar')
      if (!sidebar) return

      // get the active sidebar item DOM, whose href equals to the current route
      const activeSidebarItem = document.querySelector(
        `.sidebar a.sidebar-item[href="${route.path}${hash}"]`
      )
      if (!activeSidebarItem) return

      // get the top and height of the sidebar
      const { top: sidebarTop, height: sidebarHeight } =
        sidebar.getBoundingClientRect()
      // get the top and height of the active sidebar item
      const { top: activeSidebarItemTop, height: activeSidebarItemHeight } =
        activeSidebarItem.getBoundingClientRect()

      // when the active sidebar item overflows the top edge of sidebar
      if (activeSidebarItemTop < sidebarTop) {
        // scroll to the top edge of sidebar
        activeSidebarItem.scrollIntoView(true)
      }
      // when the active sidebar item overflows the bottom edge of sidebar
      else if (
        activeSidebarItemTop + activeSidebarItemHeight >
        sidebarTop + sidebarHeight
      ) {
        // scroll to the bottom edge of sidebar
        activeSidebarItem.scrollIntoView(false)
      }
    }
  )
})
</script>

<template>
  <ul v-if="sidebarItems.length" class="sidebar-items">
    <SidebarItem
      v-for="item in sidebarItems"
      :key="`${item.text}${item.link}`"
      :item="item"
    />
  </ul>
</template>
