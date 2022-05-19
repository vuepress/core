import { defineComponent, onMounted, ref } from 'vue'
import type { ComponentOptions } from 'vue'

export const ClientOnly: ComponentOptions = defineComponent({
  setup(_, ctx) {
    const isMounted = ref(false)
    onMounted(() => {
      isMounted.value = true
    })
    return () => (isMounted.value ? ctx.slots.default?.() : null)
  },
})
