module.exports = {
  root: true,
  extends: 'vuepress',

  // FIXME: This should be added to `eslint-config-vuepress`
  globals: {
    __VUEPRESS_CLEAN_URL__: 'readonly',
  },

  overrides: [
    {
      files: ['*.ts', '*.vue', '*.cts'],
      extends: 'vuepress-typescript',
      parserOptions: {
        project: ['tsconfig.json'],
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'vue/multi-word-component-names': 'off',
      },
    },
    {
      files: ['**/tests/**/*.ts', 'e2e/**/*.ts', 'tsup.config.ts'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        'import/no-extraneous-dependencies': 'off',
        'vue/one-component-per-file': 'off',
      },
    },
  ],
}
