import { searchIndex as searchIndexRaw } from '@internal/searchIndex'
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { SearchIndex } from '../../shared/index.js'

export type SearchIndexRef = Ref<SearchIndex>

export const searchIndex: SearchIndexRef = ref(searchIndexRaw)

export const useSearchIndex = (): SearchIndexRef => searchIndex

if (__VUEPRESS_DEV__ && (import.meta.webpackHot || import.meta.hot)) {
  __VUE_HMR_RUNTIME__.updateSearchIndex = (data: SearchIndex) => {
    searchIndex.value = data
  }
}
