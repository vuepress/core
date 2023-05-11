<script setup lang="ts">
import PageMeta from '@theme/PageMeta.vue'
import PageNav from '@theme/PageNav.vue'

defineSlots<{
  'top'?: (props: Record<never, never>) => any
  'bottom'?: (props: Record<never, never>) => any
  'content-top'?: (props: Record<never, never>) => any
  'content-bottom'?: (props: Record<never, never>) => any
}>()
</script>

<template>
  <main class="page">
    <slot name="top" />

    <div class="theme-default-content">
      <slot name="content-top" />

      <Content />

      <slot name="content-bottom" />
    </div>

    <PageMeta />

    <PageNav />

    <slot name="bottom" />
  </main>
</template>
