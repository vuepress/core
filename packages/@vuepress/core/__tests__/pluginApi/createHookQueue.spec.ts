import { createBaseApp, createHookQueue, createPage } from '@vuepress/core'
import type { Page } from '@vuepress/core'
import { path } from '@vuepress/utils'

const app = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: path.resolve(__dirname, '../__fixtures__/themes/empty.js'),
})

describe('core > pluginApi > createHookQueue', () => {
  describe('common', () => {
    const hookNames = [
      'onInitialized',
      'onPrepared',
      'onWatched',
      'onGenerated',
      'extendsMarkdown',
      'extendsPageOptions',
      'extendsPage',
      'clientAppEnhanceFiles',
      'clientAppRootComponentFiles',
      'clientAppSetupFiles',
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
        console.error = jest.fn()

        const err1 = new Error('err1')
        const err2 = new Error('err2')
        const func1 = jest.fn(() => {
          throw err1
        })
        const func2 = jest.fn(() => {
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

    hookNames.forEach((hookName) =>
      it(`${hookName}`, async () => {
        const hook = createHookQueue(hookName)
        const func1 = jest.fn()
        const func2 = jest.fn()
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
    )
  })

  describe('page hooks', () => {
    it(`extendsPageOptions`, async () => {
      const hookName = 'extendsPageOptions'

      const hook = createHookQueue(hookName)
      const func1 = jest.fn(() => ({ content: 'foo' }))
      const func2 = jest.fn(() => ({ content: 'bar' }))
      hook.add({
        pluginName: 'test1',
        hook: func1,
      })
      hook.add({
        pluginName: 'test2',
        hook: func2,
      })
      const result = await hook.process({ filePath: 'foo.md' }, app)

      expect(func1).toHaveBeenCalledTimes(1)
      expect(func1).toHaveBeenCalledWith({ filePath: 'foo.md' }, app)
      expect(func2).toHaveBeenCalledTimes(1)
      expect(func2).toHaveBeenCalledWith({ filePath: 'foo.md' }, app)
      expect(result).toEqual([{ content: 'foo' }, { content: 'bar' }])
    })

    it(`extendsPage`, async () => {
      const hookName = 'extendsPage'

      const hook = createHookQueue(hookName)
      const page = (await createPage(app, { path: '/' })) as Page<
        { bar: string },
        { foo: string }
      >
      const func1 = jest.fn((page) => {
        page.foo = 'foo'
      })
      const func2 = jest.fn((page) => {
        page.data.bar = 'bar'
      })
      hook.add({
        pluginName: 'test1',
        hook: func1,
      })
      hook.add({
        pluginName: 'test2',
        hook: func2,
      })
      await hook.process(page, app)

      expect(func1).toHaveBeenCalledTimes(1)
      expect(func1).toHaveBeenCalledWith(page, app)
      expect(func2).toHaveBeenCalledTimes(1)
      expect(func2).toHaveBeenCalledWith(page, app)
      expect(page.foo).toEqual('foo')
      expect(page.data.bar).toEqual('bar')
    })
  })

  describe('markdown hooks', () => {
    it(`extendsMarkdown`, async () => {
      const hookName = 'extendsMarkdown'

      const hook = createHookQueue(hookName)
      const func1 = jest.fn()
      const func2 = jest.fn()
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
  })

  describe('client files hooks', () => {
    const hookNames = [
      'clientAppEnhanceFiles',
      'clientAppRootComponentFiles',
      'clientAppSetupFiles',
    ] as const
    const file1 = path.resolve(
      __dirname,
      '../__fixtures__/clientFiles/clientAppEnhance.ts'
    )
    const file2 = path.resolve(
      __dirname,
      '../__fixtures__/clientFiles/clientAppSetup.ts'
    )

    hookNames.forEach((hookName) =>
      it(`${hookName}`, async () => {
        const hook = createHookQueue(hookName)
        const func1 = jest.fn(() => Promise.resolve([file1]))
        const func2 = jest.fn(() => Promise.resolve([file2]))
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
        expect(result).toEqual([[file1], [file2]])
      })
    )
  })

  describe('bundler hooks', () => {
    const hookNames = ['alias', 'define'] as const

    hookNames.forEach((hookName) =>
      it(`${hookName}`, async () => {
        const hook = createHookQueue(hookName)
        const func1 = jest.fn(() => Promise.resolve({ foo: 'foo' }))
        const func2 = jest.fn(() => Promise.resolve({ bar: 'bar' }))
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
        expect(result).toEqual([{ foo: 'foo' }, { bar: 'bar' }])
      })
    )
  })
})
