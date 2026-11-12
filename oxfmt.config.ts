import { vuepress } from '@vuepress/oxfmt-config'
import type { OxfmtConfig } from 'oxfmt'

const config: OxfmtConfig = vuepress({
  ignorePatterns: ['CHANGELOG.md', '*.html'],
})

export default config
