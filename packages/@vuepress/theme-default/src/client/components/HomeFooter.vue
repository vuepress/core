<script setup lang="ts">
import { usePageFrontmatter } from '@vuepress/client'
import { computed } from 'vue'
import type { DefaultThemeHomePageFrontmatter } from '../../shared'

const frontmatter = usePageFrontmatter<DefaultThemeHomePageFrontmatter>()
const footer = computed(() => frontmatter.value.footer)
const footerHtml = computed(() => frontmatter.value.footerHtml)
</script>

<template>
  <template v-if="footer">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-if="footerHtml" class="footer" v-html="footer" />
    <div v-else class="footer" v-text="footer" />
  </template>
</template>
