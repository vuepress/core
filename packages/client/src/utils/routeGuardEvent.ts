// Copied from https://github.com/vuejs/router/blob/941b2131e80550009e5221d4db9f366b1fea3fd5/packages/router/src/RouterLink.ts#L293
export const guardEvent = (event: MouseEvent): boolean | void => {
  // don't redirect with control keys
  if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) return
  // don't redirect when preventDefault called
  if (event.defaultPrevented) return
  // don't redirect on right click
  if (event.button !== undefined && event.button !== 0) return
  // don't redirect if `target="_blank"`
  if (event.currentTarget) {
    const target = (event.currentTarget as HTMLElement).getAttribute('target')

    if (target?.match(/\b_blank\b/i)) return
  }

  event.preventDefault()

  return true
}
