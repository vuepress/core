import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const getSubDirectories = (dir: string): string[] =>
  fs
    .readdirSync(dir)
    .filter((item) => fs.statSync(path.join(dir, item)).isDirectory())

const ROOT = path.dirname(fileURLToPath(import.meta.url))
const PACKAGES = getSubDirectories(path.resolve(ROOT, 'packages')).filter(
  (item) => item !== 'vuepress',
)

export default defineConfig({
  resolve: {
    alias: [
      {
        find: new RegExp(`^@vuepress/(${PACKAGES.join('|')})$`),
        replacement: path.resolve(ROOT, './packages/$1/src/index.ts'),
      },
    ],
  },
  test: {
    coverage: {
      all: true,
      include: ['packages/*/src/**/*.ts'],
      provider: 'istanbul',
      reporter: ['clover', 'json', 'lcov', 'text'],
    },
    include: ['packages/*/tests/**/*.spec.ts'],
  },
})
