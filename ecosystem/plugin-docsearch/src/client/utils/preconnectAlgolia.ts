import { options } from './options.js'

export const preconnectAlgolia = (): void => {
  const id = 'algolia-preconnect'
  const rIC = window.requestIdleCallback || setTimeout

  rIC(() => {
    if (document.head.querySelector(`#${id}`)) return

    const preconnect = document.createElement('link')
    preconnect.id = id
    preconnect.rel = 'preconnect'
    preconnect.href = `https://${options.appId}-dsn.algolia.net`
    preconnect.crossOrigin = ''
    document.head.appendChild(preconnect)
  })
}
