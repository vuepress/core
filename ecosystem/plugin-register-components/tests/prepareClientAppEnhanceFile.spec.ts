import { createBaseApp } from '@vuepress/core'
import { fs, getDirname, path } from '@vuepress/utils'
import { describe, expect, it } from 'vitest'
import { prepareClientConfigFile } from '../src/node/index.js'

const __dirname = getDirname(import.meta.url)

const app = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: { name: 'test' },
  bundler: {} as any,
  temp: path.resolve(__dirname, './__fixtures__/.temp'),
})
let identifier = 0

describe('plugin-register-components > node > prepareClientConfigFile', () => {
  it('should write a noop temp file', async () => {
    const tempFile = await prepareClientConfigFile(
      app,
      {
        components: {},
        componentsDir: null,
        componentsPatterns: ['**/*.vue'],
        getComponentName: (filename) =>
          path.trimExt(filename.replace(/\/|\\/g, '-')),
      },
      `${identifier++}`
    )
    const result = (await fs.readFile(tempFile)).toString()
    expect(result).not.toMatch(/app.component/)
  })

  it('should write a correct temp file', async () => {
    const tempFile = await prepareClientConfigFile(
      app,
      {
        components: {},
        componentsDir: path.resolve(__dirname, './__fixtures__/components'),
        componentsPatterns: ['**/*.vue'],
        getComponentName: (filename) =>
          path.trimExt(filename.replace(/\/|\\/g, '-')),
      },
      `${identifier++}`
    )
    const result = (await fs.readFile(tempFile)).toString()
    expect(result).toMatch(/app.component\("FooBar",/)
    expect(result).toMatch(/app.component\("Baz",/)
  })

  it('should override correctly', async () => {
    const tempFile = await prepareClientConfigFile(
      app,
      {
        components: {
          FooBar: path.resolve(
            __dirname,
            './__fixtures__/components/FooBaz.ts'
          ),
        },
        componentsDir: path.resolve(__dirname, './__fixtures__/components'),
        componentsPatterns: ['**/*.vue'],
        getComponentName: (filename) =>
          path.trimExt(filename.replace(/\/|\\/g, '-')),
      },
      `${identifier++}`
    )
    const result = (await fs.readFile(tempFile)).toString()
    expect(result).toMatch(/app.component\("FooBar",.*FooBaz.ts"/)
    expect(result).toMatch(/app.component\("Baz",/)
  })
})
