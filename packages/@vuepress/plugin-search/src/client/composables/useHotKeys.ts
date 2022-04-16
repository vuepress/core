import { onBeforeUnmount, onMounted } from 'vue'
import type { Ref } from 'vue'
import type { HotKeyOptions } from '../../shared'
import { isKeyMatched } from '../utils'

export const useHotKeys = ({
  input,
  hotKeys,
}: {
  input: Ref<HTMLInputElement | null>
  hotKeys: Ref<(string | HotKeyOptions)[]>
}): void => {
  const onKeydown = (event: KeyboardEvent): void => {
    if (!input.value || hotKeys.value.length === 0) return
    if (
      // key matched
      isKeyMatched(event, hotKeys.value) &&
      // event do not come from search box
      !(event.target as HTMLElement).contains(input.value)
    ) {
      input.value.focus()
      event.preventDefault()
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', onKeydown)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', onKeydown)
  })
}
