import { defineComponent, onMounted, ref } from 'vue'

/**
 * Wrapper component that only renders its content on the client side and skips server side rendering
 *
 * Since vue 3.5, you can try the new `data-allow-mismatch` attribute instead of `<ClientOnly>` component in some cases to avoid hydration mismatch.
 *
 * @see https://blog.vuejs.org/posts/vue-3-5#data-allow-mismatch
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
