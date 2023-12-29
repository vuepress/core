import { expect, it } from 'vitest'
import { isChildPath } from '../../src/index.js'

const testCases: [[string, string], boolean][] = [
  [['/foo', '/foo'], true],
  [['/foo', '/bar'], false],
  [['/foo', '/foo/bar'], false],
  [['/foo/bar', '/foo'], true],
  [['/foo', '/foo-bar'], false],
  [['/foo-bar', '/foo'], false],
  [['C:\\foo', 'C:\\foo'], true],
  [['C:\\foo', 'C:\\bar'], false],
  [['C:\\foo', 'C:\\foo\\bar'], false],
  [['C:\\foo\\bar', 'C:\\foo'], true],
  [['C:\\foo', 'C:\\foo-bar'], false],
  [['C:\\foo-bar', 'C:\\foo'], false],
  [['foo', 'foo'], false],
  [['foo', 'bar'], false],
  [['foo', 'foo/bar'], false],
  [['foo/bar', 'foo'], false],
  [['foo', 'foo-bar'], false],
  [['foo-bar', 'foo'], false],
]

testCases.forEach(([source, expected]) => {
  it(`${JSON.stringify(source)} -> ${expected}`, () => {
    expect(isChildPath(...source)).toBe(expected)
  })
})
