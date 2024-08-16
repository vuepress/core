import MarkdownIt from 'markdown-it'
import { describe, expect, it, vi } from 'vitest'
import { vPrePlugin } from '../../src/index.js'

const CODE_FENCE = '```'

describe('@vuepress/markdown > plugins > vPrePlugin', () => {
  describe('plugin options', () => {
    const source = `\
${CODE_FENCE}js
const a = 1
${CODE_FENCE}

\`inline\`
`
    it('should process code with default options', () => {
      const md = MarkdownIt().use(vPrePlugin)

      expect(md.render(source)).toMatchSnapshot()
    })

    it('should disable `block`', () => {
      const md = MarkdownIt().use(vPrePlugin, { block: false })

      expect(md.render(source)).toMatchSnapshot()
    })

    it('should disable `inline`', () => {
      const md = MarkdownIt().use(vPrePlugin, { inline: false })

      expect(md.render(source)).toMatchSnapshot()
    })

    it('should disable `block` and `inline`', () => {
      const md = MarkdownIt().use(vPrePlugin, { block: false, inline: false })

      expect(md.render(source)).toMatchSnapshot()
    })
  })

  describe(':v-pre / :no-v-pre', () => {
    const source = `\
${CODE_FENCE}js:v-pre
const a = 1
${CODE_FENCE}

${CODE_FENCE}js:no-v-pre
const a = 1
${CODE_FENCE}

${CODE_FENCE}js{1,2}:v-pre
const a = 1
${CODE_FENCE}

${CODE_FENCE}js{1,2}:no-v-pre
const a = 1
${CODE_FENCE}

${CODE_FENCE}js:other-syntax:v-pre
const a = 1
${CODE_FENCE}

${CODE_FENCE}js:other-syntax:no-v-pre
const a = 1
${CODE_FENCE}

${CODE_FENCE}js
const a = 1
${CODE_FENCE}
`
    it('should work if `block` is enabled by default', () => {
      const md = MarkdownIt().use(vPrePlugin)

      expect(md.render(source)).toMatchSnapshot()
    })

    it('should work if `block` is disabled', () => {
      const md = MarkdownIt().use(vPrePlugin, { block: false })

      expect(md.render(source)).toMatchSnapshot()
    })
  })

  describe('syntax highlighting', () => {
    const source = `\
${CODE_FENCE}js:v-pre
const a = 1
${CODE_FENCE}

${CODE_FENCE}js:no-v-pre
const a = 1
${CODE_FENCE}

${CODE_FENCE}js{1,2}:v-pre
const a = 1
${CODE_FENCE}

${CODE_FENCE}js{1,2}:no-v-pre
const a = 1
${CODE_FENCE}

${CODE_FENCE}js:other-syntax:v-pre
const a = 1
${CODE_FENCE}

${CODE_FENCE}js:other-syntax:no-v-pre
const a = 1
${CODE_FENCE}

${CODE_FENCE}js
const a = 1
${CODE_FENCE}
`
    it('should work highlighted code is wrapped with `<pre>`', () => {
      const highlight = vi.fn(
        (code, lang) =>
          `<pre><code>highlighted code: ${code}, lang: ${lang}</code></pre>`,
      )

      const md = MarkdownIt({ highlight }).use(vPrePlugin)

      expect(md.render(source)).toMatchSnapshot()
      expect(highlight).toHaveBeenCalledTimes(7)
    })

    it('should work if highlighted code is not wrapped with `<pre>`', () => {
      const highlight = vi.fn(
        (code, lang) => `highlighted code: ${code}, lang: ${lang}`,
      )
      const md = MarkdownIt({ highlight }).use(vPrePlugin)

      expect(md.render(source)).toMatchSnapshot()
      expect(highlight).toHaveBeenCalledTimes(7)
    })
  })
})
