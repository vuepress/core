import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { vuepress } from 'eslint-config-vuepress'

const ROOT = path.resolve(fileURLToPath(import.meta.url), '..')
const E2E_DIR = path.resolve(ROOT, 'e2e')
const PACKAGES_DIRS = fs
  .readdirSync(path.resolve(ROOT, 'packages'))
  .map((item) => `./packages/${item}`)

export default vuepress(
  {
    imports: {
      packageDir: [ROOT, E2E_DIR, ...PACKAGES_DIRS],
    },
    typescript: {
      overrides: {
        '@typescript-eslint/no-dynamic-delete': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'no-underscore-dangle': [
          'warn',
          { allow: ['_context', '_pageChunk', '_registeredComponents'] },
        ],
      },
    },
    vue: {
      overrides: {
        'vue/multi-word-component-names': 'off',
        'no-useless-assignment': 'off', // TODO: false positive in vue sfc
      },
    },
  },
  {
    files: ['**/tests/**'],
    rules: {
      'no-console': 'off',
      'prefer-template': 'off',
    },
  },
)
