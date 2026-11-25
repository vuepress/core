import type { MarkdownItPlugin } from '@mdit-vue/types'
import { fullEmoji } from '@mdit/plugin-emoji'
import type { EmojiPluginOptions } from '@mdit/plugin-emoji'

export type { EmojiPluginOptions }

export const emojiPlugin: MarkdownItPlugin<Partial<EmojiPluginOptions>> =
  fullEmoji
