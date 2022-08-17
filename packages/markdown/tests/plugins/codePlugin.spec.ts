import MarkdownIt from 'markdown-it'
import { describe, expect, it, vi } from 'vitest'
import { codePlugin } from '../../src/index.js'

const codeFence = '```'

describe('@vuepress/markdown > plugins > codePlugin', () => {
  describe('plugin options', () => {
    const source = `\
${codeFence}
Raw text
${codeFence}

${codeFence}ts
const foo = 'foo'

function bar () {
  return 1024
}
${codeFence}

${codeFence}ts{1,2}
const foo = 'foo'

function bar () {
  return 1024
}
${codeFence}

${codeFence}ts{1,2-4,5-5}
const foo = 'foo'

function bar () {
  return 1024
}

const baz = () => {
  return 2048
}
${codeFence}

${codeFence}{{ inlineCode }}${codeFence}
`

    it('should process code fences with default options', () => {
      const md = MarkdownIt().use(codePlugin)

      expect(md.render(source)).toMatchSnapshot()
    })

    it('should disable `highlightLines`', () => {
      const md = MarkdownIt().use(codePlugin, {
        highlightLines: false,
      })

      expect(md.render(source)).toMatchSnapshot()
    })

    it('should disable `lineNumbers`', () => {
      const md = MarkdownIt().use(codePlugin, {
        lineNumbers: false,
      })

      expect(md.render(source)).toMatchSnapshot()
    })

    it('should enable `lineNumbers` according to number of code lines', () => {
      const md = MarkdownIt().use(codePlugin, {
        lineNumbers: 4,
      })

      expect(md.render(source)).toMatchSnapshot()
    })

    it('should disable `preWrapper`', () => {
      const md = MarkdownIt().use(codePlugin, {
        preWrapper: false,
      })

      expect(md.render(source)).toMatchSnapshot()
    })

    it('should disable `vPre.block`', () => {
      const md = MarkdownIt().use(codePlugin, {
        vPre: {
          block: false,
          inline: true,
        },
      })

      expect(md.render(source)).toMatchSnapshot()
    })

    it('should disable `vPre.inline`', () => {
      const md = MarkdownIt().use(codePlugin, {
        vPre: {
          block: true,
          inline: false,
        },
      })

      expect(md.render(source)).toMatchSnapshot()
    })

    it('should disable `vPre.inline` and `vPre.block`', () => {
      const md = MarkdownIt().use(codePlugin, {
        vPre: {
          block: false,
          inline: false,
        },
      })

      expect(md.render(source)).toMatchSnapshot()
    })

    it('should always disable `highlightLines` if `preWrapper` is disabled', () => {
      const mdWithHighlightLines = MarkdownIt().use(codePlugin, {
        highlightLines: true,
        preWrapper: false,
      })
      const mdWithoutHighlightLine = MarkdownIt().use(codePlugin, {
        highlightLines: false,
        preWrapper: false,
      })

      expect(mdWithHighlightLines.render(source)).toBe(
        mdWithoutHighlightLine.render(source)
      )
    })

    it('should always disable `lineNumbers` if `preWrapper` is disabled', () => {
      const mdWithLineNumbers = MarkdownIt().use(codePlugin, {
        lineNumbers: true,
        preWrapper: false,
      })
      const mdWithoutLineNumbers = MarkdownIt().use(codePlugin, {
        lineNumbers: false,
        preWrapper: false,
      })

      expect(mdWithLineNumbers.render(source)).toBe(
        mdWithoutLineNumbers.render(source)
      )
    })
  })

  describe(':line-numbers / :no-line-numbers', () => {
    const source = `\
${codeFence}
Raw text
${codeFence}

${codeFence}:line-numbers
Raw text
${codeFence}

${codeFence}:no-line-numbers
Raw text
${codeFence}

${codeFence}ts
const foo = 'foo'

function bar () {
  return 1024
}
${codeFence}

${codeFence}ts:line-numbers
const foo = 'foo'

function bar () {
  return 1024
}
${codeFence}

${codeFence}ts:no-line-numbers
const foo = 'foo'

function bar () {
  return 1024
}
${codeFence}

${codeFence}ts{1,2}
const foo = 'foo'

function bar () {
  return 1024
}
${codeFence}

${codeFence}ts{1,2}:line-numbers
const foo = 'foo'

function bar () {
  return 1024
}
${codeFence}

${codeFence}ts{1,2}:no-line-numbers
const foo = 'foo'

function bar () {
  return 1024
}
${codeFence}
`

    it('should work properly if `lineNumbers` is enabled by default', () => {
      const md = MarkdownIt().use(codePlugin, {
        lineNumbers: true,
      })

      expect(md.render(source)).toMatchSnapshot()
    })

    it('should work properly if `lineNumbers` is disabled by default', () => {
      const md = MarkdownIt().use(codePlugin, {
        lineNumbers: false,
      })

      expect(md.render(source)).toMatchSnapshot()
    })

    it('should work properly if `lineNumbers` is set to a number by default', () => {
      const md = MarkdownIt().use(codePlugin, {
        lineNumbers: 4,
      })

      expect(md.render(source)).toMatchSnapshot()
    })
  })

  describe(':v-pre / :no-v-pre', () => {
    const source = `\
${codeFence}
Raw text
${codeFence}

${codeFence}:v-pre
Raw text
${codeFence}

${codeFence}:no-v-pre
Raw text
${codeFence}

${codeFence}ts
const foo = 'foo'

function bar () {
  return 1024
}
${codeFence}

${codeFence}ts:v-pre
const foo = 'foo'

function bar () {
  return 1024
}
${codeFence}

${codeFence}ts:no-v-pre
const foo = 'foo'

function bar () {
  return 1024
}
${codeFence}

${codeFence}ts{1,2}
const foo = 'foo'

function bar () {
  return 1024
}
${codeFence}

${codeFence}ts{1,2}:v-pre
const foo = 'foo'

function bar () {
  return 1024
}
${codeFence}

${codeFence}ts{1,2}:no-v-pre
const foo = 'foo'

function bar () {
  return 1024
}
${codeFence}
`

    it('should work properly if `vPre.block` is enabled by default', () => {
      const md = MarkdownIt().use(codePlugin, {
        vPre: {
          block: true,
        },
      })

      expect(md.render(source)).toMatchSnapshot()
    })

    it('should work properly if `vPre.block` is disabled by default', () => {
      const md = MarkdownIt().use(codePlugin, {
        vPre: {
          block: false,
        },
      })

      expect(md.render(source)).toMatchSnapshot()
    })
  })

  describe('syntax highlighting', () => {
    const source = `\
${codeFence}
Raw text
${codeFence}

${codeFence}js
const foo = 'foo'

function bar () {
  return 1024
}
${codeFence}

${codeFence}ts
const foo: string = 'foo'

function bar (): number {
  return 1024
}
${codeFence}

${codeFence}vue-html
<template>
  <div>msg: {{msg}}</div>
</template>
<script setup lang="ts">
const msg = 'hello world';
</script>
${codeFence}
`

    it('should work if highlighted code is wrapped with `<pre>`', () => {
      const highlight = vi.fn(
        (code, lang) =>
          `<pre><code>highlighted code: ${code}, lang: ${lang}</code></pre>`
      )
      const md = MarkdownIt({ highlight }).use(codePlugin)

      expect(md.render(source)).toMatchSnapshot()
      expect(highlight).toHaveBeenCalledTimes(4)
    })

    it('should work if highlighted code is not wrapped with `<pre>`', () => {
      const highlight = vi.fn(
        (code, lang) => `highlighted code: ${code}, lang: ${lang}`
      )
      const md = MarkdownIt({ highlight }).use(codePlugin)

      expect(md.render(source)).toMatchSnapshot()
      expect(highlight).toHaveBeenCalledTimes(4)
    })
  })
})
