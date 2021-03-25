// Reference https://github.com/vuejs/vue-router-next/blob/master/e2e/scroll-behavior/scrollWaiter.ts

export interface ScrollWaiter {
  promise: Promise<any> | undefined
  add: () => void
  flush: () => void
}

function createScrollWaiter(): ScrollWaiter {
  let waiterResolve: ((value?: any) => void) | undefined
  let promise: ScrollWaiter['promise']

  function add(): void {
    promise = new Promise((resolve) => {
      waiterResolve = resolve
    })
  }

  function flush(): void {
    waiterResolve && waiterResolve()
    waiterResolve = undefined
    promise = undefined
  }

  const waiter = {
    promise,
    add,
    flush,
  }

  Object.defineProperty(waiter, 'promise', {
    get: () => promise,
  })

  return waiter
}

export const scrollWaiter = createScrollWaiter()
