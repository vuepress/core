import { default as docsearch } from '@docsearch/js'
import { usePageLang, useRouteLocale } from '@vuepress/client'
import { isArray } from '@vuepress/shared'
import { computed, defineComponent, h, onMounted, watch } from 'vue'
import type { PropType } from 'vue'
import type { DocsearchOptions } from '../../shared/index.js'
import { useDocsearchShim } from '../composables/index.js'

declare const __DOCSEARCH_INJECT_STYLES__: boolean
declare const __DOCSEARCH_OPTIONS__: DocsearchOptions

if (__DOCSEARCH_INJECT_STYLES__) {
  import('@docsearch/css')
  import('../styles/docsearch.css')
}

export const Docsearch = defineComponent({
  name: 'Docsearch',

  props: {
    containerId: {
      type: String,
      required: false,
      default: 'docsearch-container',
    },
    options: {
      type: Object as PropType<DocsearchOptions>,
      required: false,
      default: () => __DOCSEARCH_OPTIONS__,
    },
  },

  setup(props) {
    const routeLocale = useRouteLocale()
    const lang = usePageLang()
    const docsearchShim = useDocsearchShim()

    // resolve docsearch options for current locale
    const optionsLocale = computed(() => ({
      ...props.options,
      ...props.options.locales?.[routeLocale.value],
    }))

    const facetFilters: string[] = []

    const initialize = (): void => {
      const rawFacetFilters =
        optionsLocale.value.searchParameters?.facetFilters ?? []
      facetFilters.splice(
        0,
        facetFilters.length,
        `lang:${lang.value}`,
        ...(isArray(rawFacetFilters) ? rawFacetFilters : [rawFacetFilters])
      )
      // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/50690
      docsearch({
        ...docsearchShim,
        ...optionsLocale.value,
        container: `#${props.containerId}`,
        searchParameters: {
          ...optionsLocale.value.searchParameters,
          facetFilters,
        },
      })
    }

    onMounted(() => {
      initialize()

      // re-initialize if the options is changed
      watch(
        [routeLocale, optionsLocale],
        (
          [curRouteLocale, curPropsLocale],
          [prevRouteLocale, prevPropsLocale]
        ) => {
          if (curRouteLocale === prevRouteLocale) return
          if (
            JSON.stringify(curPropsLocale) !== JSON.stringify(prevPropsLocale)
          ) {
            initialize()
          }
        }
      )

      // modify the facetFilters in place to avoid re-initializing docsearch
      // when page lang is changed
      watch(lang, (curLang, prevLang) => {
        if (curLang !== prevLang) {
          const prevIndex = facetFilters.findIndex(
            (item) => item === `lang:${prevLang}`
          )
          if (prevIndex > -1) {
            facetFilters.splice(prevIndex, 1, `lang:${curLang}`)
          }
        }
      })
    })

    return () => h('div', { id: props.containerId })
  },
})
