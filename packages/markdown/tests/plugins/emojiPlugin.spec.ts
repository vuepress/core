import MarkdownIt from 'markdown-it'
import { describe, expect, it } from 'vitest'

import { createMarkdown, emojiPlugin } from '../../src/index.js'

describe('emoji plugin', () => {
  it('should render emoji with the default full definitions', () => {
    const md = createMarkdown()

    expect(md.render(':smile:\n')).toBe('<p>😄</p>\n')
  })

  it('should render emoji shortcuts', () => {
    const md = createMarkdown()

    expect(md.render('good job :)\n')).toBe('<p>good job 😃</p>\n')
  })

  it('should keep unknown emoji as is', () => {
    const md = createMarkdown()

    expect(md.render(':not-an-emoji:\n')).toBe('<p>:not-an-emoji:</p>\n')
  })

  it('should support the custom `definitions` option', () => {
    const md = createMarkdown({ emoji: { definitions: { foo: 'FOO' } } })

    // Custom definitions replace the built-in full definitions.
    expect(md.render(':foo: :smile:\n')).toBe('<p>FOO :smile:</p>\n')
  })

  it('should support the `enabled` option', () => {
    const md = new MarkdownIt().use(emojiPlugin, {
      definitions: { foo: 'FOO', bar: 'BAR' },
      enabled: ['foo'],
    })

    expect(md.render(':foo: :bar:\n')).toBe('<p>FOO :bar:</p>\n')
  })

  it('should support the custom `shortcuts` option', () => {
    const md = new MarkdownIt().use(emojiPlugin, {
      shortcuts: { smile: '~smile~' },
    })

    // `~smile~` is not a built-in shortcut, so it is only replaced when configured
    expect(md.render('~smile~ :smile:\n')).toBe('<p>😄 😄</p>\n')
  })

  it('should not render emoji inside code', () => {
    const md = createMarkdown()

    expect(md.render('`:smile:`\n')).toBe('<p><code v-pre>:smile:</code></p>\n')
  })

  it('should set the correct nesting level on emoji tokens', () => {
    const md = createMarkdown()
    const tokens = md.parse('[link :smile:](https://example.com)', {})
    const emojiToken = tokens
      .flatMap((token) => token.children ?? [])
      .find((token) => token.type === 'emoji')

    expect(emojiToken).toMatchObject({
      content: '😄',
      level: 1,
      type: 'emoji',
    })
  })
})
