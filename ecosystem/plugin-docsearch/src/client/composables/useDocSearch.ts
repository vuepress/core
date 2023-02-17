import { usePageLang, useRouteLocale } from '@vuepress/client'
import { isArray } from '@vuepress/shared'
import { computed, onMounted, onUnmounted, readonly, ref, watch } from 'vue'
import type { Ref, WatchStopHandle } from 'vue'
import { preconnectAlgolia } from '../utils/index.js'
import { useDocsearchShim } from './useDocsearchShim.js'

export interface Docsearch {
  loaded: Readonly<Ref<boolean>>
  loadDocsearch: () => void
}

export const useDocsearch = (props): Docsearch => {
  const routeLocale = useRouteLocale()
  const lang = usePageLang()
  const docsearchShim = useDocsearchShim()

  // to avoid loading the docsearch js upfront (which is more than 1/3 of the
  // payload), we delay initializing it until the user has actually clicked or
  // hit the hotkey to invoke it.
  const loading = ref(false)
  const loaded = ref(false)
  const metaKey = ref(`'Meta'`)

  // resolve docsearch options for current locale
  const optionsLocale = computed(() => ({
    ...props.options,
    ...props.options.locales?.[routeLocale.value],
  }))

  const facetFilters: string[] = []
  const stopHandle: WatchStopHandle[] = []

  const initialize = async (): Promise<void> => {
    const { default: docsearch } = await import('@docsearch/js')

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

    loaded.value = true
  }

  const poll = (): void => {
    // programmatically open the search box after initialize
    const e = new Event('keydown') as any
    e.key = 'k'
    e.metaKey = true
    window.dispatchEvent(e)
    setTimeout(() => {
      if (!document.querySelector('.DocSearch-Modal')) {
        poll()
      }
    }, 16)
  }

  const load = (): void => {
    if (!loading.value) {
      loading.value = true
      initialize()
      setTimeout(poll, 16)
    }
  }

  onMounted(() => {
    preconnectAlgolia()

    // meta key detect (same logic as in @docsearch/js)
    metaKey.value = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)
      ? `'⌘'`
      : `'Ctrl'`

    const handleSearchHotKey = (e: KeyboardEvent): void => {
      if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        load()
        remove()
      }
    }
    const remove = (): void => {
      window.removeEventListener('keydown', handleSearchHotKey)
    }
    window.addEventListener('keydown', handleSearchHotKey)
    onUnmounted(remove)
  })

  onUnmounted(() => {
    stopHandle.forEach((item) => item())
  })

  const loadDocsearch = (): void => {
    load()

    // re-initialize if the options is changed
    stopHandle.push(
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
      ),

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
    )
  }

  return {
    loaded: readonly(loaded),
    loadDocsearch,
  }
}
