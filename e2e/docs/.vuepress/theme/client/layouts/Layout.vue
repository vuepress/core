<script setup lang="ts">
import { watch } from 'vue'
import { Content, RouteLink, useRoutePath, useSiteData } from 'vuepress/client'

const siteData = useSiteData()

watch(useRoutePath(), () => {
  console.log('layout route path changed')
})
watch(
  useRoutePath(),
  () => {
    console.log('layout route path changed post')
  },
  { flush: 'post' },
)
</script>

<template>
  <div class="e2e-theme">
    <nav class="e2e-theme-nav">
      <div>Languages</div>
      <ul>
        <li v-for="[key, value] in Object.entries(siteData.locales)" :key="key">
          <RouteLink :to="key">{{ value.lang }}</RouteLink>
        </li>
      </ul>
    </nav>

    <main class="e2e-theme-content">
      <Content />
    </main>
  </div>
</template>

<style lang="scss" scoped>
// ...
</style>
