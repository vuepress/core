import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const root = path.dirname(fileURLToPath(import.meta.url))
const nonScopedPackages = ['vuepress', 'vuepress-vite', 'vuepress-webpack']
const corePackages = fs.readdirSync(path.resolve(root, 'packages'))
const ecosystemPackages = fs
  .readdirSync(path.resolve(root, 'ecosystem'))
  .filter((item) => !nonScopedPackages.includes(item))

export default defineConfig({
  resolve: {
    alias: [
      {
        find: new RegExp(`^@vuepress/(${corePackages.join('|')})$`),
        replacement: path.resolve(root, './packages/$1/src/index.ts'),
      },
      {
        find: new RegExp(`^@vuepress/(${ecosystemPackages.join('|')})$`),
        replacement: path.resolve(root, './ecosystem/$1/src/index.ts'),
      },
    ],
  },
  test: {
    coverage: {
      provider: 'istanbul',
      reporter: ['clover', 'json', 'lcov', 'text'],
    },
  },
})
