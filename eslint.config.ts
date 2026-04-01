import path from 'node:path'

import { vuepress } from '@vuepress/eslint-config'

import { PACKAGES, ROOT } from './scripts/constants.js'

export default vuepress(
  {
    imports: {
      packageDir: [
        ROOT,
        path.resolve(ROOT, 'e2e'),
        ...PACKAGES.map((item) => path.resolve(ROOT, `packages/${item}`)),
      ],
    },
    typescript: {
      overrides: {
        '@typescript-eslint/no-unnecessary-type-arguments': 'off', // TODO: lots of false positives
      },
    },
    javascript: {
      overrides: {
        'no-underscore-dangle': [
          'warn',
          {
            allow: [
              '__dirname',
              '_context',
              '_pageChunk',
              '_pageData',
              '_registeredComponents',
            ],
          },
        ],
      },
    },
  },
  {
    files: ['**/tests/**'],
    rules: {
      'import/no-unresolved': 'off',
      'no-console': 'off',
      'prefer-template': 'off',
    },
  },
  {
    files: ['.github/**/*.md'],
    rules: {
      'markdown/no-missing-label-refs': 'off',
    },
  },
)
