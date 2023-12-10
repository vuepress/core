import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const getSubDirectories = (dir: string): string[] =>
  fs
    .readdirSync(dir)
    .filter((item) => fs.statSync(path.join(dir, item)).isDirectory())
const root = path.dirname(fileURLToPath(import.meta.url))
const nonScopedPackages = ['vuepress', 'vuepress-vite', 'vuepress-webpack']
const packages = getSubDirectories(path.resolve(root, 'packages')).filter(
  (item) => !nonScopedPackages.includes(item),
)

export default defineConfig({
  resolve: {
    alias: [
      {
        find: new RegExp(`^@vuepress/(${packages.join('|')})$`),
        replacement: path.resolve(root, './packages/$1/src/index.ts'),
      },
    ],
  },
  test: {
    coverage: {
      all: false,
      provider: 'istanbul',
      reporter: ['clover', 'json', 'lcov', 'text'],
    },
  },
})
