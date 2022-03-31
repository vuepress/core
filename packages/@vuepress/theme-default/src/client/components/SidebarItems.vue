<script setup lang="ts">
import SidebarItem from '@theme/SidebarItem.vue'
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useSidebarItems } from '../composables'

const route = useRoute()
const sidebarItems = useSidebarItems()

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
    const sidebarTop = sidebar.getBoundingClientRect().top
    const sidebarHeight = sidebar.getBoundingClientRect().height

    // get the top and height of the active sidebar item
    const activeSidebarItemTop = activeSidebarItem.getBoundingClientRect().top
    const activeSidebarItemHeight =
      activeSidebarItem.getBoundingClientRect().height

    if (activeSidebarItemTop < sidebarTop) {
      // scroll to the top edge of sidebar when the active sidebar item overflows the top edge of sidebar
      activeSidebarItem.scrollIntoView(true)
    } else if (
      activeSidebarItemTop + activeSidebarItemHeight >
      sidebarTop + sidebarHeight
    ) {
      // scroll to the bottom edge of sidebar when the active sidebar item overflows the bottom edge of sidebar
      activeSidebarItem.scrollIntoView(false)
    }
  }
)
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
