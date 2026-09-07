<script setup lang="ts">
import { useData } from 'vuepress/client'

const { page } = useData()
</script>

<template>
  <p>current path: {{ page.path }}</p>
</template>
