import { getDirname, path } from '@vuepress/utils'
import { describe, expect, it } from 'vitest'
import { getComponentsFromDir } from '../src/node/index.js'

const __dirname = getDirname(import.meta.url)

describe('plugin-register-components > node > getComponentsFromDir', () => {
  it('should get empty object if `componentsDir` is `null`', async () => {
    const result = await getComponentsFromDir({
      componentsDir: null,
      componentsPatterns: ['**/*.vue'],
      getComponentName: (filename) =>
        path.trimExt(filename.replace(/\/|\\/g, '-')),
    })
    expect(result).toEqual({})
  })

  it('should get vue components correctly', async () => {
    const result = await getComponentsFromDir({
      componentsDir: path.resolve(__dirname, './__fixtures__/components'),
      componentsPatterns: ['**/*.vue'],
      getComponentName: (filename) =>
        path.trimExt(filename.replace(/\/|\\/g, '-')),
    })
    expect(result).toEqual({
      FooBar: path.resolve(__dirname, './__fixtures__/components/FooBar.vue'),
      Baz: path.resolve(__dirname, './__fixtures__/components/Baz.vue'),
    })
  })

  it('should get vue and ts components correctly', async () => {
    const result = await getComponentsFromDir({
      componentsDir: path.resolve(__dirname, './__fixtures__/components'),
      componentsPatterns: ['**/*.{vue,ts}'],
      getComponentName: (filename) =>
        path.trimExt(filename.replace(/\/|\\/g, '-')),
    })
    expect(result).toEqual({
      FooBar: path.resolve(__dirname, './__fixtures__/components/FooBar.vue'),
      Baz: path.resolve(__dirname, './__fixtures__/components/Baz.vue'),
      FooBaz: path.resolve(__dirname, './__fixtures__/components/FooBaz.ts'),
    })
  })
})
