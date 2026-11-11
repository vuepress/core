import type { MarkdownItPlugin } from '@mdit-vue/types'
import { full } from 'markdown-it-emoji'

export interface EmojiPluginOptions {
  defs: Record<string, string>
  enabled: string[]
  shortcuts: Record<string, string[] | string>
}

export const emojiPlugin: MarkdownItPlugin<Partial<EmojiPluginOptions>> = full
