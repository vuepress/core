import type { Page } from '@vuepress/core'
import { expect, it } from 'vitest'
import { createPageDepsHelper } from '../../../src/index.js'

const createMockPage = ({
  filePathRelative,
  deps,
}: {
  filePathRelative: string
  deps: string[]
}): Page =>
  ({
    filePathRelative,
    deps,
  }) as Page

it('should handle page deps correctly', () => {
  const depsHelper = createPageDepsHelper()
  const page1 = createMockPage({ filePathRelative: 'page1', deps: ['dep1'] })
  const page2 = createMockPage({ filePathRelative: 'page2', deps: ['dep2'] })
  const page3 = createMockPage({
    filePathRelative: 'page3',
    deps: ['dep1', 'dep2'],
  })

  depsHelper.add(page1)
  expect(depsHelper.get('dep1')).toEqual(['page1'])
  expect(depsHelper.get('dep2')).toEqual([])

  depsHelper.add(page2)
  expect(depsHelper.get('dep1')).toEqual(['page1'])
  expect(depsHelper.get('dep2')).toEqual(['page2'])

  depsHelper.add(page3)
  expect(depsHelper.get('dep1')).toEqual(['page1', 'page3'])
  expect(depsHelper.get('dep2')).toEqual(['page2', 'page3'])

  depsHelper.remove(page1)
  expect(depsHelper.get('dep1')).toEqual(['page3'])
  expect(depsHelper.get('dep2')).toEqual(['page2', 'page3'])

  depsHelper.remove(page2)
  expect(depsHelper.get('dep1')).toEqual(['page3'])
  expect(depsHelper.get('dep2')).toEqual(['page3'])

  depsHelper.remove(page3)
  expect(depsHelper.get('dep1')).toEqual([])
  expect(depsHelper.get('dep2')).toEqual([])
})
