import { path } from '@vuepress/utils'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import type { Bundler } from '../../src/index.js'
import { createBaseApp, createPage } from '../../src/index.js'

describe('should work without plugins', () => {
  const app = createBaseApp({
    source: path.resolve(__dirname, 'fake-source'),
    theme: { name: 'test' },
    bundler: {} as Bundler,
  })

  beforeAll(async () => {
    await app.init()
  })

  it('should throw an error', async () => {
    const consoleError = console.error
    console.error = vi.fn()

    await expect(createPage(app, {})).rejects.toThrow()
    expect(console.error).toHaveBeenCalled()

    console.error = consoleError
  })

  it('should create an empty page', async () => {
    const page = await createPage(app, {
      path: '/',
    })

    // page data
    expect(page.data.path).toBe('/')
    expect(page.data.lang).toBe('en-US')
    expect(page.data.title).toBe('')
    expect(page.data.frontmatter).toEqual({})

    // base fields
    expect(page.path).toBe('/')
    expect(page.lang).toBe('en-US')
    expect(page.title).toBe('')
    expect(page.frontmatter).toEqual({})
    expect(page.headers).toEqual([])

    // extra fields
    expect(page.content).toBe('')
    expect(page.contentRendered).toBe('')
    expect(page.date).toBe('0000-00-00')
    expect(page.deps).toEqual([])
    expect(page.sfcBlocks).toEqual({
      template: {
        type: 'template',
        content: '<template></template>',
        contentStripped: '',
        tagClose: '</template>',
        tagOpen: '<template>',
      },
      script: null,
      scriptSetup: null,
      scripts: [],
      styles: [],
      customBlocks: [],
    })
    expect(page.links).toEqual([])
    expect(page.pathInferred).toBeNull()
    expect(page.pathLocale).toBe('/')
    expect(page.permalink).toBeNull()
    expect(page.slug).toBe('')

    // file info
    expect(page.filePath).toBeNull()
    expect(page.filePathRelative).toBeNull()
    expect(page.htmlFilePath).toBe(app.dir.dest(`index.html`))
    expect(page.htmlFilePathRelative).toBe(`index.html`)
    expect(page.chunkFilePath).toBe(
      app.dir.temp(`pages/${page.htmlFilePathRelative}.vue`),
    )
    expect(page.chunkFilePathRelative).toBe(
      `pages/${page.htmlFilePathRelative}.vue`,
    )
    expect(page.chunkName).toBe(`index.html`)
  })
})

describe('should work with plugins', () => {
  it('should be extended by plugin correctly', async () => {
    const app = createBaseApp({
      source: path.resolve(__dirname, 'fake-source'),
      theme: { name: 'test' },
      bundler: {} as Bundler,
    })
    app.use({
      name: 'foo',
      extendsPageOptions: (options) => {
        options.path = '/foo/'
      },
      extendsPage: (page) => {
        page.frontmatter.bar = 'bar'
      },
    })
    await app.init()

    const page = await createPage(app, {
      path: '/',
    })
    expect(page.path).toBe('/foo/')
    expect(page.frontmatter.bar).toBe('bar')
  })
})
