import type {
  HeadAttrsConfig,
  HeadConfig,
  HeadTag,
  HeadTagEmpty,
  HeadTagNonEmpty,
  LocaleConfig,
  LocaleData,
  PageData,
  PageFrontmatter,
  PageHeader,
  SiteData,
  SiteLocaleConfig,
} from '@vuepress/shared'

export type {
  HeadConfig,
  HeadTag,
  HeadTagEmpty,
  HeadTagNonEmpty,
  HeadAttrsConfig,
  LocaleConfig,
  LocaleData,
  PageData,
  PageFrontmatter,
  PageHeader,
  SiteData,
  SiteLocaleConfig,
}

export type * from './app/index.js'
export type * from './bundler.js'
export type * from './page.js'
export type * from './plugin.js'
export type * from './pluginApi/index.js'
export type * from './theme.js'
