import { stringifyScriptString } from '@vuepress/utils'
import { describe, expect, it, vi } from 'vitest'

import { prepareRoutes } from '../../../src/app/prepare/prepareRoutes.js'
import type { App, AppWriteTemp, Page } from '../../../src/index.js'

const createTestPage = (partial: Partial<Page> = {}): Page =>
  ({
    path: '/foo.html',
    pathInferred: null,
    chunkFilePath: 'foo.html.js',
    chunkName: 'foo',
    routeMeta: { title: 'Foo' },
    ...partial,
  }) as Page

const createTestApp = (pages: Page[], isDev = false): App =>
  ({
    pages,
    env: { isDev },
    writeTemp: vi.fn<
      (...args: Parameters<AppWriteTemp>) => ReturnType<AppWriteTemp>
    >(() => Promise.resolve('')),
  }) as unknown as App

const getRoutesContent = (app: App): string =>
  vi.mocked(app.writeTemp).mock.calls[0]?.[1] ?? ''

describe('prepareRoutes', () => {
  it('should escape page paths, chunk file paths and route meta', async () => {
    const page = createTestPage({
      path: '/foo</script><script>alert(1)</script>.html',
      chunkFilePath: '/path/to/</script>.html.js',
      routeMeta: { title: '</script><script>alert(1)</script>' },
    })
    const app = createTestApp([page])

    await prepareRoutes(app)

    const content = getRoutesContent(app)
    expect(content).not.toContain('</script>')
    expect(content).toContain(
      `[${stringifyScriptString(page.path)}, { loader: () => import(/* webpackChunkName: "foo" */${stringifyScriptString(page.chunkFilePath)}), meta: JSON.parse(${stringifyScriptString(JSON.stringify(page.routeMeta))}) }],`,
    )
  })

  it('should keep route meta as an object after escaping', async () => {
    const page = createTestPage({ routeMeta: { title: '</script>' } })
    const app = createTestApp([page])

    await prepareRoutes(app)

    const content = getRoutesContent(app)
    expect(content).toContain('meta: JSON.parse(')
    expect(content).not.toContain('meta: "')

    // the escaped literal is still resolved to the route meta object at runtime
    const metaLiteral =
      /meta: JSON\.parse\(("(?:[^"\\]|\\.)*")\)/.exec(content)?.[1] ?? ''
    const metaJson = JSON.parse(metaLiteral) as string
    expect(JSON.parse(metaJson)).toEqual(page.routeMeta)
  })

  it('should escape redirect targets', async () => {
    const page = createTestPage({
      path: '/foo</script>.html',
      pathInferred: '/foo/bar',
    })
    const app = createTestApp([page])

    await prepareRoutes(app)

    const content = getRoutesContent(app)
    const redirectsLine = content.split('\n')[0] ?? ''
    const redirectsLiteral = redirectsLine.slice(
      redirectsLine.indexOf('JSON.parse(') + 'JSON.parse('.length,
      redirectsLine.lastIndexOf(')'),
    )

    expect(content).not.toContain('</script>')
    expect(redirectsLiteral).toBe(
      stringifyScriptString(
        JSON.stringify({ '/foo/bar.html': '/foo</script>.html' }),
      ),
    )
  })

  it('should inject HMR code in dev mode', async () => {
    const app = createTestApp([createTestPage()], true)

    await prepareRoutes(app)

    expect(getRoutesContent(app)).toContain(
      '__VUE_HMR_RUNTIME__.updateRoutes?.',
    )
  })
})
