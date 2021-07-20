import { ref } from 'vue'
import type { Ref } from 'vue'

const isDarkMode = ref(false)

export const useDarkMode = (): Ref<boolean> => isDarkMode
