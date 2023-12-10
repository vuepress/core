<script setup lang="ts">
import { Content, useSiteData } from '@vuepress/client'

const siteData = useSiteData()
</script>

<template>
  <div class="e2e-theme">
    <nav class="e2e-theme-nav">
      <div>Languages</div>
      <ul>
        <li v-for="[key, value] in Object.entries(siteData.locales)" :key="key">
          <RouterLink :to="key">{{ value.lang }}</RouterLink>
        </li>
      </ul>
    </nav>

    <main class="e2e-theme-content">
      <Content />
    </main>
  </div>
</template>

<style lang="scss" scoped></style>
