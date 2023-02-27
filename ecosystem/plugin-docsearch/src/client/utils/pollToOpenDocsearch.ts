const POLL_INTERVAL = 16

/**
 * Programmatically open the docsearch modal
 */
export const pollToOpenDocsearch = (): void => {
  if (document.querySelector('.DocSearch-Modal')) return
  const e = new Event('keydown') as {
    -readonly [P in keyof KeyboardEvent]: KeyboardEvent[P]
  }
  e.key = 'k'
  e.metaKey = true
  window.dispatchEvent(e)
  setTimeout(pollToOpenDocsearch, POLL_INTERVAL)
}
