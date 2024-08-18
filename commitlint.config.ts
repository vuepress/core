import type { UserConfig } from '@commitlint/types'
import { PACKAGES } from './scripts/constants.js'

export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', [...PACKAGES, 'e2e']],
    'footer-max-line-length': [0],
  },
} satisfies UserConfig
