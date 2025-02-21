<script lang="ts" setup>
import { ref, watch } from 'vue'
import { onContentUpdated, useRoutePath } from 'vuepress/client'

const mounted = ref('')
const beforeUnmount = ref('')

const mountedCount = ref(0)
const updatedCount = ref(0)

const routePath = useRoutePath()

watch(routePath, () => {
  updatedCount.value = 0
})

onContentUpdated((reason) => {
  switch (reason) {
    case 'mounted':
      mounted.value = routePath.value
      mountedCount.value++
      break
    case 'updated':
      updatedCount.value++
      break
    case 'beforeUnmount':
      beforeUnmount.value = routePath.value
      break
    default:
  }
})
</script>

<template>
  <div class="markdown-content-hooks">
    <h3>markdown content hooks</h3>
    <p class="markdown-content-mounted">
      mounted: {{ mounted }} {{ mountedCount }}
    </p>
    <p class="markdown-content-beforeUnmount">
      beforeUnmount: {{ beforeUnmount }}
    </p>
    <p class="markdown-content-updated">updatedCount: {{ updatedCount }}</p>
  </div>
</template>
