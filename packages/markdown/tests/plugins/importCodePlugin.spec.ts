import { fs, path } from '@vuepress/utils'
import MarkdownIt from 'markdown-it'
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest'
import { importCodePlugin, vPrePlugin } from '../../src/index.js'
import type { MarkdownEnv } from '../../src/index.js'

const jsFixturePathRelative = '../__fixtures__/importCode.js'
const mdFixturePathRelative = '../__fixtures__/importCode.md'
const jsFixturePath = path.resolve(__dirname, jsFixturePathRelative)
const mdFixturePath = path.resolve(__dirname, mdFixturePathRelative)
const jsFixtureContent = fs.readFileSync(jsFixturePath).toString()
const mdFixtureContent = fs.readFileSync(mdFixturePath).toString()

const consoleError = console.error
const mockConsoleError = vi.fn()

beforeAll(() => {
  console.error = mockConsoleError
})

afterEach(() => {
  mockConsoleError.mockClear()
})

afterAll(() => {
  console.error = consoleError
})

describe('@vuepress/markdown > plugins > importCodePlugin', () => {
  it('should not be parsed as import code syntax', () => {
    const source = [
      '@[cod',
      '@[code',
      '@[code]',
      '@[code](./foo.js',
      '@[code](/path/to/foo.js',
      '@[coda](/path/to/foo.js',
    ]

    const md = MarkdownIt().use(importCodePlugin)
    const env: MarkdownEnv = {
      filePath: __filename,
    }
    const rendered = md.render(source.join('\n\n'), env)

    expect(rendered).toEqual(
      source.map((item) => `<p>${item}</p>`).join('\n') + '\n',
    )
    expect(env.importedFiles).toBeUndefined()
  })

  describe('lines range', () => {
    it('should import all lines', () => {
      const source = `\
@[code](${jsFixturePathRelative})
@[code](${mdFixturePathRelative})
`

      const expected = `\
<pre><code class="language-js">\
${jsFixtureContent}\
</code></pre>
<pre><code class="language-md">\
${mdFixtureContent}\
</code></pre>
`

      const md = MarkdownIt().use(importCodePlugin)
      const env: MarkdownEnv = {
        filePath: __filename,
      }
      const rendered = md.render(source, env)

      expect(rendered).toEqual(expected)
      expect(env.importedFiles).toEqual([jsFixturePath, mdFixturePath])
    })

    it('should import partial lines', () => {
      const source = `\
@[code{1-2}](${jsFixturePathRelative})
@[code{1-}](${jsFixturePathRelative})
@[code{2}](${jsFixturePathRelative})
@[code{4-5}](${mdFixturePathRelative})
@[code{-5}](${mdFixturePathRelative})
@[code{5}](${mdFixturePathRelative})
`

      const expected = `\
<pre><code class="language-js">\
${jsFixtureContent.split('\n').slice(0, 2).join('\n').replace(/\n?$/, '\n')}\
</code></pre>
<pre><code class="language-js">\
${jsFixtureContent.split('\n').slice(0).join('\n').replace(/\n?$/, '\n')}\
</code></pre>
<pre><code class="language-js">\
${jsFixtureContent.split('\n').slice(1, 1).join('\n').replace(/\n?$/, '\n')}\
</code></pre>
<pre><code class="language-md">\
${mdFixtureContent.split('\n').slice(3, 5).join('\n').replace(/\n?$/, '\n')}\
</code></pre>
<pre><code class="language-md">\
${mdFixtureContent.split('\n').slice(0, 5).join('\n').replace(/\n?$/, '\n')}\
</code></pre>
<pre><code class="language-md">\
${mdFixtureContent.split('\n').slice(4, 5).join('\n').replace(/\n?$/, '\n')}\
</code></pre>
`

      const md = MarkdownIt().use(importCodePlugin)
      const env: MarkdownEnv = {
        filePath: __filename,
      }
      const rendered = md.render(source, env)

      expect(rendered).toEqual(expected)
      expect(env.importedFiles).toEqual([
        jsFixturePath,
        jsFixturePath,
        jsFixturePath,
        mdFixturePath,
        mdFixturePath,
        mdFixturePath,
      ])
    })
  })

  describe('code language', () => {
    it('should use user defined language', () => {
      const source = `\
@[code](/foo.js)
@[code ts](/bar.md)
`

      const expected = `\
<pre><code class="language-js">File not found</code></pre>
<pre><code class="language-ts">File not found</code></pre>
`

      const md = MarkdownIt().use(importCodePlugin)
      const env: MarkdownEnv = {
        filePath: __filename,
      }
      const rendered = md.render(source, env)

      expect(rendered).toEqual(expected)
      expect(env.importedFiles).toEqual(['/foo.js', '/bar.md'])
      expect(mockConsoleError).toHaveBeenCalledTimes(2)
    })

    it('should use file ext as fallback language', () => {
      const source = `\
@[code](/foo.js)
@[code](/bar.md)
`
      const expected = `\
<pre><code class="language-js">File not found</code></pre>
<pre><code class="language-md">File not found</code></pre>
`

      const md = MarkdownIt().use(importCodePlugin)
      const env: MarkdownEnv = {
        filePath: __filename,
      }
      const rendered = md.render(source, env)

      expect(rendered).toEqual(expected)
      expect(env.importedFiles).toEqual(['/foo.js', '/bar.md'])
      expect(mockConsoleError).toHaveBeenCalledTimes(2)
    })
  })

  describe('path resolving', () => {
    it('should resolve relative path according to filePath', () => {
      const source = `\
@[code](/foo.js)
@[code](./bar.js)
`
      const expected = `\
<pre><code class="language-js">File not found</code></pre>
<pre><code class="language-js">File not found</code></pre>
`

      const md = MarkdownIt().use(importCodePlugin)
      const env: MarkdownEnv = {
        filePath: __filename,
      }
      const rendered = md.render(source, env)

      expect(rendered).toEqual(expected)
      expect(env.importedFiles).toEqual([
        '/foo.js',
        path.resolve(__dirname, './bar.js'),
      ])
      expect(mockConsoleError).toHaveBeenCalledTimes(2)
    })

    it('should not resolve relative path if filePath is not provided', () => {
      const source = `\
@[code](/foo.js)
@[code](./bar.js)
`
      const expected = `\
<pre><code class="language-js">File not found</code></pre>
<pre><code class="language-js">Error when resolving path</code></pre>
`

      const md = MarkdownIt().use(importCodePlugin)
      const env: MarkdownEnv = {
        filePath: null,
      }
      const rendered = md.render(source, env)

      expect(rendered).toEqual(expected)
      expect(env.importedFiles).toEqual(['/foo.js'])
      expect(mockConsoleError).toHaveBeenCalledTimes(2)
    })

    it('should handle import path correctly', () => {
      const source = `\
@[code](@fixtures/importCode.js)
`
      const expected = `\
<pre><code class="language-js">\
${jsFixtureContent}\
</code></pre>
`

      const md = MarkdownIt().use(importCodePlugin, {
        handleImportPath: (str: string): string =>
          str.replace(/^@fixtures/, path.resolve(__dirname, '../__fixtures__')),
      })
      const env: MarkdownEnv = {
        filePath: null,
      }
      const rendered = md.render(source, env)

      expect(rendered).toEqual(expected)
      expect(env.importedFiles).toEqual([jsFixturePath])
    })
  })

  describe('compatibility with other markdown syntax', () => {
    it('should terminate paragraph', () => {
      const source = `\
foo
@[code](/path/to/foo.js)
`
      const expected = `\
<p>foo</p>
<pre><code class="language-js">File not found</code></pre>
`

      const md = MarkdownIt().use(importCodePlugin)
      const env: MarkdownEnv = {
        filePath: __filename,
      }
      const rendered = md.render(source, env)

      expect(rendered).toEqual(expected)
      expect(env.importedFiles).toEqual(['/path/to/foo.js'])
      expect(mockConsoleError).toHaveBeenCalledTimes(1)
    })

    it('should terminate blockquote', () => {
      const source = `\
> foo
@[code](/path/to/foo.js)
`
      const expected = `\
<blockquote>
<p>foo</p>
</blockquote>
<pre><code class="language-js">File not found</code></pre>
`

      const md = MarkdownIt().use(importCodePlugin)
      const env: MarkdownEnv = {
        filePath: __filename,
      }
      const rendered = md.render(source, env)

      expect(rendered).toEqual(expected)
      expect(env.importedFiles).toEqual(['/path/to/foo.js'])
      expect(mockConsoleError).toHaveBeenCalledTimes(1)
    })
  })

  describe('compatibility with otherPlugin', () => {
    it('should preserve the things after code as fence info', () => {
      const source1 = `\
@[code js{1,3-4}](${jsFixturePathRelative})
`
      const source2 = `\
@[code md:no-line-numbers:no-v-pre title="no-line-numbers.md"](${mdFixturePathRelative})
`

      const md = MarkdownIt().use(importCodePlugin)
      const env1: MarkdownEnv = {
        filePath: __filename,
      }

      const rendered1 = md.render(source1, env1)

      expect(rendered1).toEqual(
        md.render(`\
\`\`\`js{1,3-4}
${jsFixtureContent}\
\`\`\`
`),
      )
      expect(rendered1).toMatchSnapshot()
      expect(env1.importedFiles).toEqual([jsFixturePath])

      const env2: MarkdownEnv = {
        filePath: __filename,
      }

      const rendered2 = md.render(source2, env2)

      expect(rendered2).toEqual(
        md.render(`\
\`\`\`md:no-line-numbers:no-v-pre title="no-line-numbers.md"
${mdFixtureContent}\
\`\`\`
`),
      )
      expect(rendered2).toMatchSnapshot()
      expect(env2.importedFiles).toEqual([mdFixturePath])
    })

    it('should work with syntax supported by vPrePlugin', () => {
      const source1 = `\
@[code js{1,3-4}](${jsFixturePathRelative})
`
      const source2 = `\
@[code md:no-line-numbers:no-v-pre title="no-line-numbers.md"](${mdFixturePathRelative})
`

      const md = MarkdownIt().use(importCodePlugin).use(vPrePlugin)
      const env: MarkdownEnv = {
        filePath: __filename,
      }

      const rendered1 = md.render(source1, env)
      const rendered2 = md.render(source2, env)

      expect(rendered1).to.contain('v-pre')
      expect(rendered2).to.not.contain(' v-pre')
    })
  })
})
