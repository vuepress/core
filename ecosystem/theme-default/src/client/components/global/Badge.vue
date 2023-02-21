<script setup lang="ts">
defineProps({
  type: {
    type: String,
    default: 'tip',
  },
  text: {
    type: String,
    default: '',
  },
  vertical: {
    type: String,
    default: undefined,
  },
})
</script>

<template>
  <span
    class="badge"
    :class="type"
    :style="{
      verticalAlign: vertical,
    }"
  >
    <slot>{{ text }}</slot>
  </span>
</template>
