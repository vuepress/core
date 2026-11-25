import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'

import { path } from '@vuepress/utils'
import { afterEach, beforeEach, expect, it } from 'vitest'

import type { BuildApp, Bundler, Plugin } from '../../src/index.js'
import { createBuildApp } from '../../src/index.js'

let source: string

const createApp = (plugins: Plugin[] = []): BuildApp =>
  createBuildApp({
    source,
    theme: { name: 'test-theme' },
    bundler: {} as Bundler,
    plugins,
  })

const getInitError = async (app: BuildApp): Promise<Error> => {
  try {
    await app.init()
  } catch (error) {
    return error as Error
  }
  throw new Error('app.init() did not throw')
}

beforeEach(async () => {
  source = await mkdtemp(path.join(tmpdir(), 'vuepress-duplicate-pages-'))
})

afterEach(async () => {
  await rm(source, { recursive: true, force: true })
})

it('should fail init when two source files resolve to the same page path', async () => {
  await writeFile(path.join(source, '_foo.md'), '# _foo')
  await writeFile(path.join(source, 'foo.md'), '# foo')

  const app = createApp()
  const error = await getInitError(app)

  expect(error.message).toContain('Duplicate page paths detected:')
  expect(error.message).toContain(path.join(source, '_foo.md'))
  expect(error.message).toContain(path.join(source, 'foo.md'))
})

it('should fail init when a plugin makes two pages share the same page path', async () => {
  await writeFile(path.join(source, 'foo.md'), '# foo')
  await writeFile(path.join(source, 'bar.md'), '# bar')

  const app = createApp([
    {
      name: 'test-plugin',
      extendsPage: (page) => {
        if (page.filePathRelative === 'bar.md') {
          page.path = '/foo.html'
        }
      },
    },
  ])
  const error = await getInitError(app)

  expect(error.message).toContain(
    'route path "/foo.html" is resolved by multiple pages:',
  )
  expect(error.message).toContain(path.join(source, 'foo.md'))
  expect(error.message).toContain(path.join(source, 'bar.md'))
})

it('should init successfully when all pages are unique', async () => {
  await writeFile(path.join(source, 'foo.md'), '# foo')
  await writeFile(path.join(source, 'bar.md'), '# bar')

  const app = createApp()
  await app.init()

  expect(app.pages.map((page) => page.path)).toEqual(
    expect.arrayContaining(['/foo.html', '/bar.html', '/404.html']),
  )
  expect(app.pages).toHaveLength(3)
})
