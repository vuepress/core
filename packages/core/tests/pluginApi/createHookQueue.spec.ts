import type { MarkdownOptions } from '@vuepress/markdown'
import { createMarkdown } from '@vuepress/markdown'
import { path } from '@vuepress/utils'
import { describe, expect, it, vi } from 'vitest'
import type { Bundler, Hooks, PageOptions } from '../../src/index.js'
import { createBaseApp, createHookQueue, createPage } from '../../src/index.js'

const app = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: { name: 'test' },
  bundler: {} as Bundler,
})
app.markdown = createMarkdown()

describe('common', () => {
  const hookNames = [
    'onInitialized',
    'onPrepared',
    'onWatched',
    'onGenerated',
    'extendsMarkdownOptions',
    'extendsMarkdown',
    'extendsPageOptions',
    'extendsPage',
    'extendsBundlerOptions',
    'clientConfigFile',
    'alias',
    'define',
  ] as const

  hookNames.forEach((hookName) => {
    const hook = createHookQueue(hookName)

    it('should have correct name', () => {
      expect(hook.name).toEqual(hookName)
    })

    it('should throw error from the first item', async () => {
      const consoleError = console.error
      console.error = vi.fn()

      const err1 = new Error('err1')
      const err2 = new Error('err2')
      const func1 = vi.fn(() => {
        throw err1
      })
      const func2 = vi.fn(() => {
        throw err2
      })
      hook.add({
        pluginName: 'test1',
        hook: func1,
      })
      hook.add({
        pluginName: 'test2',
        hook: func2,
      })
      await expect(hook.process(app)).rejects.toThrowError(err1)
      expect(console.error).toHaveBeenCalled()

      expect(func1).toHaveBeenCalledTimes(1)
      expect(func1).toHaveBeenCalledWith(app)
      expect(func2).toHaveBeenCalledTimes(0)

      console.error = consoleError
    })
  })
})

describe('lifecycle hooks', () => {
  const hookNames = [
    'onInitialized',
    'onPrepared',
    'onWatched',
    'onGenerated',
  ] as const

  hookNames.forEach((hookName) => {
    it(hookName, async () => {
      const hook = createHookQueue(hookName)
      const func1 = vi.fn()
      const func2 = vi.fn()
      hook.add({
        pluginName: 'test1',
        hook: func1,
      })
      hook.add({
        pluginName: 'test2',
        hook: func2,
      })
      await hook.process(app)

      expect(func1).toHaveBeenCalledTimes(1)
      expect(func1).toHaveBeenCalledWith(app)
      expect(func2).toHaveBeenCalledTimes(1)
      expect(func2).toHaveBeenCalledWith(app)
    })
  })
})

describe('extends hooks', () => {
  it(`extendsMarkdownOptions`, async () => {
    const hookName = 'extendsMarkdownOptions'

    const hook = createHookQueue(hookName)
    const func1 = vi.fn<Hooks['extendsMarkdownOptions']['normalized']>(
      (markdownOptions) => {
        markdownOptions.emoji = false
      },
    )
    const func2 = vi.fn<Hooks['extendsMarkdownOptions']['normalized']>(
      (markdownOptions) => {
        markdownOptions.headers = false
      },
    )
    hook.add({
      pluginName: 'test1',
      hook: func1,
    })
    hook.add({
      pluginName: 'test2',
      hook: func2,
    })
    const markdownOptions: MarkdownOptions = {}
    await hook.process(markdownOptions, app)

    expect(func1).toHaveBeenCalledTimes(1)
    expect(func1).toHaveBeenCalledWith(markdownOptions, app)
    expect(func2).toHaveBeenCalledTimes(1)
    expect(func2).toHaveBeenCalledWith(markdownOptions, app)
    expect(markdownOptions).toEqual({ emoji: false, headers: false })
  })

  it(`extendsMarkdown`, async () => {
    const hookName = 'extendsMarkdown'

    const hook = createHookQueue(hookName)
    const func1 = vi.fn()
    const func2 = vi.fn()
    hook.add({
      pluginName: 'test1',
      hook: func1,
    })
    hook.add({
      pluginName: 'test2',
      hook: func2,
    })
    await hook.process(app.markdown, app)

    expect(func1).toHaveBeenCalledTimes(1)
    expect(func1).toHaveBeenCalledWith(app.markdown, app)
    expect(func2).toHaveBeenCalledTimes(1)
    expect(func2).toHaveBeenCalledWith(app.markdown, app)
  })

  it(`extendsPageOptions`, async () => {
    const hookName = 'extendsPageOptions'

    const hook = createHookQueue(hookName)
    const func1 = vi.fn<Hooks['extendsPageOptions']['normalized']>(
      (pageOptions) => {
        pageOptions.content = pageOptions.content ?? 'foo'
      },
    )
    const func2 = vi.fn<Hooks['extendsPageOptions']['normalized']>(
      (pageOptions) => {
        pageOptions.content = pageOptions.content ?? 'nar'
      },
    )
    hook.add({
      pluginName: 'test1',
      hook: func1,
    })
    hook.add({
      pluginName: 'test2',
      hook: func2,
    })
    const pageOptions: PageOptions = { filePath: 'foo.md' }
    await hook.process(pageOptions, app)

    expect(func1).toHaveBeenCalledTimes(1)
    expect(func1).toHaveBeenCalledWith(pageOptions, app)
    expect(func2).toHaveBeenCalledTimes(1)
    expect(func2).toHaveBeenCalledWith(pageOptions, app)
    expect(pageOptions).toEqual({ filePath: 'foo.md', content: 'foo' })
  })

  it(`extendsPage`, async () => {
    const hookName = 'extendsPage'

    const hook = createHookQueue(hookName)
    const page = await createPage(app, { path: '/' })
    const func1 = vi.fn<Hooks['extendsPage']['normalized']>((extendedPage) => {
      extendedPage.data.extraData = 'foo'
    })
    const func2 = vi.fn<Hooks['extendsPage']['normalized']>((extendedPage) => {
      extendedPage.frontmatter.extraFrontmatter = 'bar'
    })
    const func3 = vi.fn<Hooks['extendsPage']['normalized']>((extendedPage) => {
      extendedPage.extraField = 'baz'
    })
    hook.add({
      pluginName: 'test1',
      hook: func1,
    })
    hook.add({
      pluginName: 'test2',
      hook: func2,
    })
    hook.add({
      pluginName: 'test3',
      hook: func3,
    })
    await hook.process(page, app)

    expect(func1).toHaveBeenCalledTimes(1)
    expect(func1).toHaveBeenCalledWith(page, app)
    expect(func2).toHaveBeenCalledTimes(1)
    expect(func2).toHaveBeenCalledWith(page, app)
    expect(page.data.extraData).toEqual('foo')
    expect(page.frontmatter.extraFrontmatter).toEqual('bar')
    expect(page.extraField).toEqual('baz')
  })

  it(`extendsBundlerOptions`, async () => {
    const hookName = 'extendsBundlerOptions'

    const hook = createHookQueue(hookName)
    const func1 = vi.fn<Hooks['extendsBundlerOptions']['normalized']>(
      (bundlerOptions) => {
        bundlerOptions.foo = 'foo'
      },
    )
    const func2 = vi.fn<Hooks['extendsBundlerOptions']['normalized']>(
      (bundlerOptions) => {
        bundlerOptions.bar = 'bar'
      },
    )
    hook.add({
      pluginName: 'test1',
      hook: func1,
    })
    hook.add({
      pluginName: 'test2',
      hook: func2,
    })
    const bundlerOptions = {}
    await hook.process(bundlerOptions, app)

    expect(func1).toHaveBeenCalledTimes(1)
    expect(func1).toHaveBeenCalledWith(bundlerOptions, app)
    expect(func2).toHaveBeenCalledTimes(1)
    expect(func2).toHaveBeenCalledWith(bundlerOptions, app)
    expect(bundlerOptions).toEqual({ foo: 'foo', bar: 'bar' })
  })
})

describe('client config file hook', () => {
  const hookNames = ['clientConfigFile'] as const
  const file1 = path.resolve(
    __dirname,
    '../__fixtures__/clientConfigs/clientConfig.ts',
  )
  const file2 = path.resolve(
    __dirname,
    '../__fixtures__/clientConfigs/clientConfig2.ts',
  )

  hookNames.forEach((hookName) => {
    it(hookName, async () => {
      const hook = createHookQueue(hookName)
      const func1 = vi.fn(async () => Promise.resolve(file1))
      const func2 = vi.fn(async () => Promise.resolve(file2))
      hook.add({
        pluginName: 'test1',
        hook: func1,
      })
      hook.add({
        pluginName: 'test2',
        hook: func2,
      })
      const result = await hook.process(app)

      expect(func1).toHaveBeenCalledTimes(1)
      expect(func1).toHaveBeenCalledWith(app)
      expect(func2).toHaveBeenCalledTimes(1)
      expect(func2).toHaveBeenCalledWith(app)
      expect(result).toEqual([file1, file2])
    })
  })
})

describe('bundler hooks', () => {
  const hookNames = ['alias', 'define'] as const

  hookNames.forEach((hookName) => {
    it(hookName, async () => {
      const hook = createHookQueue(hookName)
      const func1 = vi.fn(async () => Promise.resolve({ foo: 'foo' }))
      const func2 = vi.fn(async () => Promise.resolve({ bar: 'bar' }))
      hook.add({
        pluginName: 'test1',
        hook: func1,
      })
      hook.add({
        pluginName: 'test2',
        hook: func2,
      })
      const result = await hook.process(app, true)

      expect(func1).toHaveBeenCalledTimes(1)
      expect(func1).toHaveBeenCalledWith(app, true)
      expect(func2).toHaveBeenCalledTimes(1)
      expect(func2).toHaveBeenCalledWith(app, true)
      expect(result).toEqual([{ foo: 'foo' }, { bar: 'bar' }])
    })
  })
})
