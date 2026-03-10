import { expect, it } from 'vitest'
import { isChildPath } from '../../src/index.js'

const TEST_CASES: [[string, string], boolean][] = [
  [['/foo', '/foo'], true],
  [['/foo', '/bar'], false],
  [['/foo', '/foo/bar'], false],
  [['/foo/bar', '/foo'], true],
  [['/foo', '/foo-bar'], false],
  [['/foo-bar', '/foo'], false],
  [[String.raw`C:\foo`, String.raw`C:\foo`], true],
  [[String.raw`C:\foo`, String.raw`C:\bar`], false],
  [[String.raw`C:\foo`, String.raw`C:\foo\bar`], false],
  [[String.raw`C:\foo\bar`, String.raw`C:\foo`], true],
  [[String.raw`C:\foo`, String.raw`C:\foo-bar`], false],
  [[String.raw`C:\foo-bar`, String.raw`C:\foo`], false],
  [['foo', 'foo'], false],
  [['foo', 'bar'], false],
  [['foo', 'foo/bar'], false],
  [['foo/bar', 'foo'], false],
  [['foo', 'foo-bar'], false],
  [['foo-bar', 'foo'], false],
]

TEST_CASES.forEach(([source, expected]) => {
  it(`${JSON.stringify(source)} -> ${expected}`, () => {
    expect(isChildPath(...source)).toBe(expected)
  })
})
