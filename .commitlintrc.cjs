const fs = require('fs')
const path = require('path')

const corePackages = fs.readdirSync(path.resolve(__dirname, 'packages'))
const ecosystemPackages = fs.readdirSync(path.resolve(__dirname, 'ecosystem'))

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [...corePackages, ...ecosystemPackages],
    ],
    'footer-max-line-length': [0],
  },
}
