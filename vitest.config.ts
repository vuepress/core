import path from 'node:path'
import { defineConfig } from 'vitest/config'
import { PACKAGES, ROOT } from './scripts/constants.js'

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
