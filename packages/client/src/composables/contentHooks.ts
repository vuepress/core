import { onUnmounted } from 'vue'

type LifeCycle = 'beforeUnmount' | 'change' | 'mounted'

const hooks: Record<LifeCycle, (() => unknown)[]> = {
  mounted: [],
  beforeUnmount: [],
  change: [],
}

const createHook =
  (lifeCycle: LifeCycle) =>
  (fn: () => unknown): void => {
    hooks[lifeCycle].push(fn)
    onUnmounted(() => {
      hooks[lifeCycle] = hooks[lifeCycle].filter((f) => f !== fn)
    })
  }

export const onContentChange = createHook('change')

export const onContentMounted = createHook('mounted')

export const onContentBeforeUnmount = createHook('beforeUnmount')

/**
 * Call all registered callbacks
 */
export const runCallbacks = (lifeCycle: LifeCycle): void => {
  hooks[lifeCycle].forEach((fn) => fn())
}
