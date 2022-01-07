import { createBaseApp, createPage } from '@vuepress/core'
import { path } from '@vuepress/utils'

const app = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: path.resolve(__dirname, '../__fixtures__/themes/empty.js'),
})

beforeAll(async () => {
  await app.init()
})

describe('core > page > createPage', () => {
  it('should throw an error', async () => {
    const consoleError = console.error
    console.error = jest.fn()

    await expect(createPage(app, {})).rejects.toThrow()
    expect(console.error).toHaveBeenCalled()

    console.error = consoleError
  })

  it('should create an empty page', async () => {
    const page = await createPage(app, {
      path: '/',
    })

    // page data
    expect(page.data.key).toBeTruthy()
    expect(page.data.path).toBe('/')
    expect(page.data.lang).toBe('en-US')
    expect(page.data.title).toBe('')
    expect(page.data.frontmatter).toEqual({})
    expect(page.data.excerpt).toBe('')
    expect(page.data.headers).toEqual([])

    // base fields
    expect(page.key).toBeTruthy()
    expect(page.path).toBe('/')
    expect(page.lang).toBe('en-US')
    expect(page.title).toBe('')
    expect(page.frontmatter).toEqual({})
    expect(page.excerpt).toBe('')
    expect(page.headers).toEqual([])

    // extra fields
    expect(page.content).toBe('')
    expect(page.contentRendered).toBe('')
    expect(page.date).toBe('0000-00-00')
    expect(page.deps).toEqual([])
    expect(page.hoistedTags).toEqual([])
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
    expect(page.componentFilePath).toBe(
      app.dir.temp(`pages/${page.htmlFilePathRelative}.vue`)
    )
    expect(page.componentFilePathRelative).toBe(
      `pages/${page.htmlFilePathRelative}.vue`
    )
    expect(page.componentFileChunkName).toBe(page.key)
    expect(page.dataFilePath).toBe(
      app.dir.temp(`pages/${page.htmlFilePathRelative}.js`)
    )
    expect(page.dataFilePathRelative).toBe(
      `pages/${page.htmlFilePathRelative}.js`
    )
    expect(page.dataFileChunkName).toBe(page.key)
  })

  it('should be extended by plugin correctly', async () => {
    const app = createBaseApp({
      source: path.resolve(__dirname, 'fake-source'),
      theme: path.resolve(__dirname, '../__fixtures__/themes/empty.js'),
    })
    app.use({
      name: 'test',
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
