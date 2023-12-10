// TODO: markdown-it-emoji v3 is not typed correctly for now
declare module 'markdown-it-emoji' {
  import type emojiPlugin from '@types/markdown-it-emoji'

  const bare: typeof emojiPlugin
  const light: typeof emojiPlugin
  const full: typeof emojiPlugin
  type Options = emojiPlugin.Options

  export { bare, light, full }
  export type { Options }
}
