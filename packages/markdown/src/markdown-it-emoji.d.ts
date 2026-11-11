declare module 'markdown-it-emoji' {
  import type { MarkdownItPlugin } from '@mdit-vue/types'

  export interface Options {
    defs: Record<string, string>
    enabled: string[]
    shortcuts: Record<string, string[] | string>
  }

  type EmojiPlugin = MarkdownItPlugin<Partial<Options>>

  export const bare: EmojiPlugin
  export const full: EmojiPlugin
  export const light: EmojiPlugin
}
