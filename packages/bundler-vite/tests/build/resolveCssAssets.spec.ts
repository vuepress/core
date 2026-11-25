import type { RolldownOutput } from 'rolldown'
import { expect, test } from 'vitest'

import { resolveCssAssets } from '../../src/build/resolveCssAssets.js'

const createOutput = (
  items: { fileName: string; type: 'asset' | 'chunk' }[],
): RolldownOutput['output'] => items as unknown as RolldownOutput['output']

test('should resolve no css assets from output without css', () => {
  expect(
    resolveCssAssets(
      createOutput([
        { type: 'chunk', fileName: 'app.js' },
        { type: 'asset', fileName: 'app.svg' },
        { type: 'asset', fileName: 'style.css.map' },
      ]),
    ),
  ).toEqual([])
})

test('should resolve all css assets in output order', () => {
  expect(
    resolveCssAssets(
      createOutput([
        { type: 'chunk', fileName: 'app.js' },
        { type: 'asset', fileName: 'assets/style.css' },
        { type: 'asset', fileName: 'assets/logo.svg' },
        { type: 'asset', fileName: 'assets/page.css' },
      ]),
    ).map(({ fileName }) => fileName),
  ).toEqual(['assets/style.css', 'assets/page.css'])
})

test('should dedupe css assets by file name and keep the first occurrence', () => {
  const first = { type: 'asset' as const, fileName: 'assets/style.css' }
  const second = { type: 'asset' as const, fileName: 'assets/page.css' }

  expect(
    resolveCssAssets(
      createOutput([
        first,
        second,
        { type: 'asset', fileName: 'assets/style.css' },
      ]),
    ),
  ).toEqual([first, second])
})
