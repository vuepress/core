import { vuepress } from '@vuepress/oxlint-config'
import type { OxlintConfig } from 'oxlint'

const config: OxlintConfig = vuepress({
  options: {
    typeAware: true,
  },
  rules: {
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
    'jsdoc/check-tag-names': [
      'warn',
      {
        definedTags: ['experimental', 'remark', 'required'],
        jsxTags: false,
        typed: false,
      },
    ],
    'typescript/prefer-nullish-coalescing': 'off',
  },
  overrides: [
    {
      files: ['**/*.cjs', '**/*.cts'],
      rules: {
        'typescript/consistent-type-imports': 'off',
        'typescript/no-require-imports': 'off',
        'typescript/no-var-requires': 'off',
      },
    },
    {
      files: ['**/tests/**'],
      rules: {
        'no-console': 'off',
        'prefer-template': 'off',
        'vitest/valid-title': 'off',
      },
    },
    {
      files: ['**/tests/__fixtures__/**'],
      rules: {
        'unicorn/no-empty-file': 'off',
      },
    },
    {
      files: ['packages/markdown/src/**'],
      rules: {
        'default-param-last': 'off',
      },
    },
  ],
})

export default config
