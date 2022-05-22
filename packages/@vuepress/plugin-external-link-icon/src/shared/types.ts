import type { LocaleConfig } from '@vuepress/shared'

export type ExternalLinkIconLocales = LocaleConfig<{
  openInNewWindow: string
}>

export interface ExternalLinkIconFrontmatter {
  externalLinkIcon?: boolean
}
