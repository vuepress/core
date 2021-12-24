<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
import type { PropType } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { ResolvedSidebarItem } from '../../shared'
import { isActiveSidebarItem } from '../utils'
import DropdownTransition from './DropdownTransition.vue'
import NavLink from './NavLink.vue'

const props = defineProps({
  item: {
    type: Object as PropType<ResolvedSidebarItem>,
    required: true,
  },
  depth: {
    type: Number,
    required: false,
    default: 0,
  },
})

const { item, depth } = toRefs(props)
const route = useRoute()
const router = useRouter()

const isActive = computed(() => isActiveSidebarItem(item.value, route))
const itemClass = computed(() => ({
  'sidebar-item': true,
  'sidebar-heading': depth.value === 0,
  'active': isActive.value,
  'collapsible': item.value.collapsible,
}))

const isOpen = ref(true)
const onClick = ref<(() => void) | undefined>(undefined)

if (item.value.collapsible) {
  // active item is open by default
  isOpen.value = isActive.value
  // toggle open status on click
  onClick.value = () => {
    isOpen.value = !isOpen.value
  }
  // reset open status after navigation
  router.afterEach(() => {
    isOpen.value = isActive.value
  })
}
</script>

<template>
  <NavLink v-if="item.link" :class="itemClass" :item="item" />
  <p v-else :class="itemClass" @click="onClick">
    {{ item.text }}
    <span
      v-if="item.collapsible"
      class="arrow"
      :class="isOpen ? 'down' : 'right'"
    />
  </p>

  <DropdownTransition v-if="item.children?.length">
    <ul v-show="isOpen" class="sidebar-item-children">
      <li v-for="child in item.children" :key="child.text">
        <SidebarItem :item="child" :depth="depth + 1" />
      </li>
    </ul>
  </DropdownTransition>
</template>
