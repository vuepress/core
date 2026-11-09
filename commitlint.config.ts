import { RuleConfigSeverity } from '@commitlint/types'
import type { UserConfig } from '@commitlint/types'

import { PACKAGES } from './scripts/constants.js'

export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [RuleConfigSeverity.Error, 'always', [...PACKAGES, 'e2e']],
    'footer-max-line-length': [RuleConfigSeverity.Disabled],
  },
} satisfies UserConfig
