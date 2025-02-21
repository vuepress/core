<script setup lang="ts">
import { Content } from 'vuepress/client'
</script>

<template>
  <div class="e2e-theme">
    <nav class="e2e-theme-nav">
      <div>Languages</div>
      <ul>
        <li v-for="[key, value] in Object.entries($site.locales)" :key="key">
          <RouterLink :to="key">{{ value.lang }}</RouterLink>
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
