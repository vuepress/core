<script setup lang="ts">
defineOptions({
  name: 'CodeGroupItem',
})

defineProps({
  title: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: false,
    default: false,
  },
})
</script>

<template>
  <div
    class="code-group-item"
    :class="{ 'code-group-item__active': active }"
    role="tabpanel"
  >
    <slot />
  </div>
</template>
