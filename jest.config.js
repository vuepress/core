const { readdirSync } = require('fs')
const { resolve } = require('path')
const { compilerOptions } = require('./tsconfig.base.json')

const packagesDir = 'packages/@vuepress'
const packages = readdirSync(resolve(__dirname, packagesDir), {
  withFileTypes: true,
})
  .filter((item) => item.isDirectory())
  .map(({ name }) => name)

const commonPackages = packages.filter(
  (item) => !item.startsWith('plugin-') && !item.startsWith('theme-')
)
const pluginAndThemePackages = packages.filter(
  (item) => item.startsWith('plugin-') || item.startsWith('theme-')
)

module.exports = {
  rootDir: resolve(__dirname),
  testEnvironment: 'node',
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: {
        ...compilerOptions,
        module: 'CommonJS',
        sourceMap: true,
      },
    },
    '__VUEPRESS_VERSION__': '',
    '__VUEPRESS_DEV__': false,
    '__VUEPRESS_SSR__': false,
  },
  moduleNameMapper: {
    [`^@vuepress/(${commonPackages.join(
      '|'
    )})$`]: `<rootDir>/${packagesDir}/$1/src`,
    [`^@vuepress/(${pluginAndThemePackages.join(
      '|'
    )})$`]: `<rootDir>/${packagesDir}/$1/src/node`,
    '^@internal/(.*)$': `<rootDir>/packages/@vuepress/client/__tests__/__fixtures__/$1`,
    '.+\\.(css|styl|less|sass|scss)$':
      '<rootDir>/packages/@vuepress/client/__tests__/__fixtures__/styleMock',
  },
  testMatch: ['<rootDir>/packages/**/__tests__/**/*.spec.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/__fixtures__/'],
  snapshotSerializers: [require.resolve('jest-serializer-vue')],

  // coverage config
  collectCoverageFrom: [
    '<rootDir>/packages/**/src/**/*.ts',
    '!<rootDir>/packages/@vuepress/client/**/*',
    '!<rootDir>/packages/@vuepress/*/src/client/**/*',
    '!**/*.d.ts',
  ],
  coverageDirectory: 'coverage',
}
