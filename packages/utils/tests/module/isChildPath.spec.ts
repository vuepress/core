import { expect, it } from 'vitest'

import { isChildPath } from '../../src/index.js'

const POSIX_TEST_CASES: [[string, string], boolean][] = [
  [['/foo', '/foo'], true],
  [['/foo/', '/foo'], true],
  [['/foo/.', '/foo'], true],
  [['/foo/bar/..', '/foo'], true],
  [['/foo/..foo', '/foo'], true],
  [['/foo/bar', '/foo'], true],
  [['/foo/', '/'], true],
  [['/foo', '/foo/bar'], false],
  [['/foo', '/foo-bar'], false],
  [['/foo-bar', '/foo'], false],
  [['/foo/..', '/foo'], false],
  [['/foo/../bar', '/foo'], false],
  [['/bar', '/foo'], false],
  [['/', '/foo'], false],
  [['/foo', '/'], true],
]

const WINDOWS_TEST_CASES: [[string, string], boolean][] = [
  [['C:\\foo', 'C:\\foo'], true],
  [['C:\\foo\\', 'C:\\foo'], true],
  [['C:\\foo\\..foo', 'C:\\foo'], true],
  [['C:\\foo\\bar', 'C:\\foo'], true],
  [['c:\\foo\\bar', 'C:\\foo'], true],
  [['C:\\foo/bar', 'C:/foo'], true],
  [['C:\\foo', 'C:\\foo\\bar'], false],
  [['C:\\foo\\..', 'C:\\foo'], false],
  [['C:\\foo', 'C:\\foo-bar'], false],
  [['C:\\foo-bar', 'C:\\foo'], false],
  [['C:\\foo', 'D:\\foo'], false],
  [['D:\\foo', 'C:\\foo'], false],
  [['\\\\server\\share\\foo', '\\\\server\\share'], true],
  [['\\\\server\\share', '\\\\server\\share\\foo'], false],
]

const RELATIVE_TEST_CASES: [[string, string], boolean][] = [
  [['.', '.'], true],
  [['./dist', '.'], true],
  [['dist', '.git'], false],
  [['dist', 'dist'], true],
  [['dist', 'dist/..'], true],
  [['dist', 'dist/child'], false],
  [['dist/child', 'dist'], true],
  [['dist', 'dist2'], false],
  [['..', '.'], false],
  [['../foo', '.'], false],
  [['foo', 'foo-bar'], false],
]

const MIXED_TEST_CASES: [[string, string], boolean][] = [
  [['/foo', 'C:\\foo'], false],
  [['C:\\foo', '/foo'], false],
]

const TEST_CASES: [[string, string], boolean][] = [
  ...POSIX_TEST_CASES,
  ...WINDOWS_TEST_CASES,
  ...RELATIVE_TEST_CASES,
  ...MIXED_TEST_CASES,
]

TEST_CASES.forEach(([source, expected]) => {
  it(`${JSON.stringify(source)} -> ${expected}`, () => {
    expect(isChildPath(...source)).toBe(expected)
  })
})
