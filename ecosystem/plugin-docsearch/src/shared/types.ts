import type { DocSearchProps } from '@docsearch/react'
import type { DocSearchHit } from '@docsearch/react/dist/esm/types'
import type { LocaleConfig } from '@vuepress/shared'

export type DocsearchLocaleData = Pick<
  DocSearchProps,
  | 'appId'
  | 'apiKey'
  | 'indexName'
  | 'placeholder'
  | 'searchParameters'
  | 'disableUserPersonalization'
  | 'initialQuery'
  | 'translations'
  | 'transformItems'
>

export interface DocsearchOptions extends DocsearchLocaleData {
  locales?: LocaleConfig<DocsearchLocaleData>
}

export type TransformFunc = (items: DocSearchHit[]) => DocSearchHit[]
