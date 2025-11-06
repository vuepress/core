import path from 'node:path'
import { vuepress } from 'eslint-config-vuepress'
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
    vue: {
      overrides: {
        'no-useless-assignment': 'off', // TODO: false positive in vue sfc
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
)
