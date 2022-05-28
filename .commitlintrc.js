const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const packages = fs.readdirSync(path.resolve(__dirname, 'packages/@vuepress'))

const scopeComplete = execSync('git status --porcelain || true')
  .toString()
  .trim()
  .split('\n')
  .find((r) => ~r.indexOf('M  packages'))
  ?.replace(/\//g, '%%')
  ?.match(/(packages%%@vuepress%%|packages%%)((\w|-)*)/)?.[2]

/** @type {import('cz-git').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      ['vuepress', 'vuepress-vite', 'vuepress-webpack', ...packages],
    ],
    'footer-max-line-length': [0],
  },
  prompt: {
    defaultScope: scopeComplete,
    customScopesAlign: !scopeComplete ? 'top' : 'bottom',
    allowCustomIssuePrefixs: false,
    allowEmptyIssuePrefixs: false,
  },
}
