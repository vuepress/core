import type { ServerResponse } from 'node:http'
import path from 'node:path'

import type { App } from '@vuepress/core'
import { logger } from '@vuepress/utils'
import type { Connect, ViteDevServer } from 'vite'
import { afterEach, expect, test, vi } from 'vitest'

import { vuepressDevPlugin } from '../../src/plugins/vuepressDevPlugin.js'

interface FakeResponse {
  body: string
  endCount: number
  headers: Record<string, string>
  headersSent: boolean
  statusCode: number
  writableEnded: boolean
  setHeader: (name: string, value: string) => void
  end: (chunk?: string) => void
}

interface FakeRequest {
  originalUrl?: string
  url?: string
}

const templateDev = path.resolve(
  import.meta.dirname,
  '../../../client/templates/dev.html',
)

const createApp = (): App =>
  ({
    options: {
      templateDev,
    },
    env: {
      isBuild: false,
      isDev: true,
      isDebug: false,
    },
  }) as unknown as App

const createResponse = (): FakeResponse => {
  const res: FakeResponse = {
    body: '',
    endCount: 0,
    headers: {},
    headersSent: false,
    statusCode: 0,
    writableEnded: false,
    setHeader: (name, value) => {
      res.headers[name.toLowerCase()] = value
    },
    end: (chunk) => {
      res.endCount += 1
      res.body += chunk ?? ''
      res.writableEnded = true
      res.headersSent = true
    },
  }

  return res
}

const createServer = (
  transformIndexHtml: ViteDevServer['transformIndexHtml'],
): { handlers: Connect.NextHandleFunction[]; server: ViteDevServer } => {
  const handlers: Connect.NextHandleFunction[] = []

  const middlewares = {
    use: (handler: Connect.NextHandleFunction) => {
      handlers.push(handler)
      return middlewares
    },
  }

  const server = {
    transformIndexHtml,
    middlewares,
  } as unknown as ViteDevServer

  return { handlers, server }
}

const setupHtmlHandler = async (
  transformIndexHtml: ViteDevServer['transformIndexHtml'],
): Promise<Connect.NextHandleFunction> => {
  const { handlers, server } = createServer(transformIndexHtml)
  const plugin = vuepressDevPlugin({ app: createApp() })
  const configureServer = plugin.configureServer as (
    server: ViteDevServer,
  ) => Promise<(() => void) | void>

  const postHook = await configureServer(server)
  postHook?.()

  const handler = handlers.at(-1)
  if (!handler) {
    throw new Error('HTML middleware was not registered')
  }

  return handler
}

const runHandler = (
  handler: Connect.NextHandleFunction,
  req: FakeRequest,
): { next: Connect.NextFunction; res: FakeResponse } => {
  const res = createResponse()
  const next = vi.fn<Connect.NextFunction>()

  handler(
    req as unknown as Connect.IncomingMessage,
    res as unknown as ServerResponse,
    next,
  )

  return { next, res }
}

const flushPromises = (): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, 0)
  })

afterEach(() => {
  vi.restoreAllMocks()
})

test('should respond with the transformed index html', async () => {
  const transformIndexHtml = vi.fn<ViteDevServer['transformIndexHtml']>(() =>
    Promise.resolve('<html>transformed</html>'),
  )
  const handler = await setupHtmlHandler(transformIndexHtml)

  const { next, res } = runHandler(handler, {
    originalUrl: '/',
    url: '/index.html',
  })
  await flushPromises()

  expect(transformIndexHtml).toHaveBeenCalledWith(
    '/index.html',
    expect.stringContaining(`import 'vuepress/client-app'`),
    '/',
  )
  expect(res.statusCode).toBe(200)
  expect(res.headers['content-type']).toBe('text/html')
  expect(res.body).toBe('<html>transformed</html>')
  expect(res.endCount).toBe(1)
  expect(next).not.toHaveBeenCalled()
})

test('should respond 500 when transformIndexHtml rejects', async () => {
  const loggerError = vi.spyOn(logger, 'error').mockImplementation(() => {})
  const transformIndexHtml = vi.fn<ViteDevServer['transformIndexHtml']>(() =>
    Promise.reject(new Error('boom')),
  )
  const handler = await setupHtmlHandler(transformIndexHtml)

  const { next, res } = runHandler(handler, {
    originalUrl: '/',
    url: '/index.html',
  })
  await flushPromises()

  expect(res.statusCode).toBe(500)
  expect(res.headers['content-type']).toBe('text/plain; charset=utf-8')
  expect(res.body).toContain('boom')
  expect(res.endCount).toBe(1)
  expect(next).not.toHaveBeenCalled()
  expect(loggerError).toHaveBeenCalledWith(
    expect.stringContaining('/index.html'),
    expect.any(Error),
  )
})

test('should respond 500 when transformIndexHtml throws synchronously', async () => {
  const loggerError = vi.spyOn(logger, 'error').mockImplementation(() => {})
  const transformIndexHtml = vi.fn<ViteDevServer['transformIndexHtml']>(() => {
    throw new Error('sync boom')
  })
  const handler = await setupHtmlHandler(transformIndexHtml)

  const { res } = runHandler(handler, {
    originalUrl: '/',
    url: '/index.html',
  })
  await flushPromises()

  expect(res.statusCode).toBe(500)
  expect(res.body).toContain('sync boom')
  expect(res.endCount).toBe(1)
  expect(loggerError).toHaveBeenCalledWith(
    expect.stringContaining('/index.html'),
    expect.any(Error),
  )
})

test('should not leave an unhandled rejection when transformIndexHtml rejects', async () => {
  vi.spyOn(logger, 'error').mockImplementation(() => {})
  const unhandledRejections: unknown[] = []
  const onUnhandledRejection = (reason: unknown): void => {
    unhandledRejections.push(reason)
  }
  process.on('unhandledRejection', onUnhandledRejection)

  try {
    const transformIndexHtml = vi.fn<ViteDevServer['transformIndexHtml']>(() =>
      Promise.reject(new Error('unhandled boom')),
    )
    const handler = await setupHtmlHandler(transformIndexHtml)

    const { res } = runHandler(handler, {
      originalUrl: '/',
      url: '/index.html',
    })
    await flushPromises()

    expect(res.endCount).toBe(1)
    expect(unhandledRejections).toHaveLength(0)
  } finally {
    process.off('unhandledRejection', onUnhandledRejection)
  }
})

test('should not end the response twice', async () => {
  let resolveTransform: (value: string) => void = () => {}
  const transformPromise = new Promise<string>((resolve) => {
    resolveTransform = resolve
  })
  const transformIndexHtml = vi.fn<ViteDevServer['transformIndexHtml']>(
    () => transformPromise,
  )
  const handler = await setupHtmlHandler(transformIndexHtml)

  const { res } = runHandler(handler, {
    originalUrl: '/',
    url: '/index.html',
  })
  res.writableEnded = true
  resolveTransform('<html>transformed</html>')
  await flushPromises()

  expect(res.endCount).toBe(0)
})

test.for([
  { name: 'missing', req: { originalUrl: '/' } },
  { name: 'non-html', req: { originalUrl: '/', url: '/index' } },
])('should call next when req.url is $name', async ({ req }) => {
  const transformIndexHtml = vi.fn<ViteDevServer['transformIndexHtml']>(() =>
    Promise.resolve('<html/>'),
  )
  const handler = await setupHtmlHandler(transformIndexHtml)

  const { next, res } = runHandler(handler, req)
  await flushPromises()

  expect(next).toHaveBeenCalledTimes(1)
  expect(res.endCount).toBe(0)
  expect(transformIndexHtml).not.toHaveBeenCalled()
})
