<template>
  <Transition
    name="dropdown"
    @enter="setHeight"
    @after-enter="unsetHeight"
    @before-leave="setHeight"
  >
    <slot />
  </Transition>
</template>

<script setup lang="ts">
const setHeight = (items): void => {
  // explicitly set height so that it can be transitioned
  items.style.height = items.scrollHeight + 'px'
}

const unsetHeight = (items): void => {
  items.style.height = ''
}
</script>
