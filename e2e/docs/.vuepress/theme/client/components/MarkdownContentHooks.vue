<script lang="ts" setup>
import { ref, watch } from 'vue'
import {
  onContentBeforeUnmount,
  onContentChange,
  onContentMounted,
  useRoutePath,
} from 'vuepress/client'

const mounted = ref('')
const beforeUnmount = ref('')

const mountedCount = ref(0)
const changedCount = ref(0)

const routePath = useRoutePath()

watch(routePath, () => {
  changedCount.value = 0
})

onContentMounted(() => {
  mounted.value = routePath.value
  mountedCount.value++
})

onContentChange(() => {
  changedCount.value++
})

onContentBeforeUnmount(() => {
  beforeUnmount.value = mounted.value
})
</script>

<template>
  <div class="markdown-content-hooks">
    <p class="markdown-content-mounted">
      mounted: {{ mounted }} {{ mountedCount }}
    </p>
    <p class="markdown-content-before-unmount">
      beforeUnmount: {{ beforeUnmount }}
    </p>
    <p class="markdown-content-change">changedCount: {{ changedCount }}</p>
  </div>
</template>
