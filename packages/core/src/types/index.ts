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

export * from './app/index.js'
export * from './bundler.js'
export * from './page.js'
export * from './plugin.js'
export * from './pluginApi/index.js'
export * from './theme.js'
