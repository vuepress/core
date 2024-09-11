import { fs, path } from '@vuepress/utils'
import { expect, it } from 'vitest'
import { resolvePageContent } from '../../src/index.js'

it('should resolve file content correctly from file path', async () => {
  const filePath = path.resolve(__dirname, '../__fixtures__/pages/foo.md')
  const resolved = await resolvePageContent({ filePath, options: {} })

  const expected = (await fs.readFile(filePath)).toString()
  expect(resolved).toBe(expected)
})

it('should use content from page options', async () => {
  const content = 'foobar'
  const resolved = await resolvePageContent({
    filePath: null,
    options: { content },
  })

  const expected = content
  expect(resolved).toBe(expected)
})

it('should return empty string if nothing provided', async () => {
  const resolved = await resolvePageContent({
    filePath: null,
    options: {},
  })

  const expected = ''
  expect(resolved).toBe(expected)
})

it('should use content from page options and ignore file path', async () => {
  const filePath = path.resolve(__dirname, '../__fixtures__/pages/foo.md')
  const content = 'foobar'
  const resolved = await resolvePageContent({
    filePath,
    options: { content },
  })

  const expected = content
  expect(resolved).toBe(expected)
})

it('should throw error if the file does not exist', async () => {
  try {
    await resolvePageContent({
      filePath: '404',
      options: {},
    })
  } catch (e) {
    expect(e).not.toBeUndefined()
  }
})
