import type { MarkdownItPlugin } from '@mdit-vue/types'
import type { EmojiPluginOptions as MdEmojiPluginOptions } from '@mdit/plugin-emoji'
import { fullEmoji } from '@mdit/plugin-emoji'

export interface EmojiPluginOptions {
  defs: Record<string, string>
  enabled: string[]
  shortcuts: Record<string, string[] | string>
}

export const emojiPlugin: MarkdownItPlugin<Partial<EmojiPluginOptions>> = (
  md,
  { defs, enabled, shortcuts } = {},
) => {
  const options: MdEmojiPluginOptions = {
    // keep the VuePress public option name `defs`, the new plugin calls it
    // `definitions`. `undefined` keeps the built-in full emoji definitions.
    definitions: defs,
    enabled,
    shortcuts,
  }

  fullEmoji(md, options)
}
