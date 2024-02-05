import { defineComponent, onMounted, ref } from 'vue'

/**
 * Wrapper component that only renders its content on the client side and skips server side rendering
 */
export const ClientOnly = defineComponent({
  name: 'ClientOnly',

  setup(_, ctx) {
    const isMounted = ref(false)
    onMounted(() => {
      isMounted.value = true
    })
    return () => (isMounted.value ? ctx.slots.default?.() : null)
  },
})
