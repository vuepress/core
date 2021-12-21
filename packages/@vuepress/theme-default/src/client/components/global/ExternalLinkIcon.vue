<script setup lang="ts">
import { ExternalLinkIcon as RawExternalLinkIcon } from '@vuepress/plugin-external-link-icon/lib/client'
import { useThemeLocaleData } from '../../composables'

const themeLocale = useThemeLocaleData()
</script>

<template>
  <RawExternalLinkIcon>
    <span class="sr-only">{{ themeLocale.openInNewWindow }}</span>
  </RawExternalLinkIcon>
</template>
