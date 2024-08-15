import * as fs from 'node:fs'
import * as path from 'node:path'
import type { UserConfig } from '@commitlint/types'

const getSubDirectories = (dir: string): string[] =>
  fs
    .readdirSync(dir)
    .filter((item) => fs.statSync(path.join(dir, item)).isDirectory())

const PACKAGES = getSubDirectories(path.resolve(__dirname, 'packages'))

export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', [...PACKAGES, 'e2e']],
    'footer-max-line-length': [0],
  },
} satisfies UserConfig
