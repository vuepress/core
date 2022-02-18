<script setup lang="ts">
import SidebarItem from '@theme/SidebarItem.vue'
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { useSidebarItems } from '../composables'

const sidebarItems = useSidebarItems()

const route = useRouter()

watch(
  () => route,
  (router) => {
    // the sidebarItem dom whose href equals to the current href of the page
    const activeSidebarItem = document.querySelector(
      `[href="${router.currentRoute.value.path}${router.currentRoute.value.hash}"]`
    )

    const sidebar = document.querySelector('.sidebar')
    if (activeSidebarItem && sidebar) {
      // the top and height of the sidebarItem
      const activeSidebarItemTop = activeSidebarItem.getBoundingClientRect().top
      const activeSidebarItemHeight =
        activeSidebarItem.getBoundingClientRect().height
      // the top and height of the sidebar
      const sidebarTop = sidebar.getBoundingClientRect().top
      const sidebarHeight = sidebar.getBoundingClientRect().height

      if (activeSidebarItemTop < sidebarTop) {
        // scroll to the top edge of sidebar when sidebarItem overflows the top edge of sidebar
        activeSidebarItem.scrollIntoView(true)
      } else if (
        activeSidebarItemTop + activeSidebarItemHeight >
        sidebarTop + sidebarHeight
      ) {
        // scroll to the bottom edge of sidebar when sidebarItem overflows the bottom edge of sidebar
        activeSidebarItem.scrollIntoView(false)
      }
    }
  },
  {
    deep: true,
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
