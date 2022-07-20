export const getScrollTop = (): number =>
  window.pageYOffset ||
  document.documentElement.scrollTop ||
  document.body.scrollTop ||
  0

export const scrollToTop = (): void =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
