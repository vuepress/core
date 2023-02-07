import { usePageLang, useRouteLocale } from '@vuepress/client'
import { isArray } from '@vuepress/shared'
import {
  computed,
  defineComponent,
  h,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue'
import type { PropType } from 'vue'
import type { DocsearchOptions } from '../../shared/index.js'
import { useDocsearchShim } from '../composables/index.js'

declare const __DOCSEARCH_INJECT_STYLES__: boolean
declare const __DOCSEARCH_OPTIONS__: DocsearchOptions
const options = __DOCSEARCH_OPTIONS__

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
      default: () => options,
    },
  },

  setup(props) {
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

    const initialize = async (): Promise<void> => {
      const [{ default: docsearch }] = await Promise.all([
        import('@docsearch/js'),
        ...(__DOCSEARCH_INJECT_STYLES__
          ? [import('@docsearch/css'), import('../styles/docsearch.css')]
          : []),
      ])

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

    const load = (): void => {
      if (!loading.value) {
        loading.value = true
        initialize()
        setTimeout(poll, 16)
      }
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

    onMounted(() => {
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

    onMounted(() => {
      const id = 'algolia-preconnect'
      const rIC = window.requestIdleCallback || setTimeout

      rIC(() => {
        if (document.head.querySelector(`#${id}`)) return

        const preconnect = document.createElement('link')
        preconnect.id = id
        preconnect.rel = 'preconnect'
        preconnect.href = `https://${options.appId}-dsn.algolia.net`
        preconnect.crossOrigin = ''
        document.head.appendChild(preconnect)
      })
    })

    return () => [
      h('div', {
        id: props.containerId,
        style: { display: loaded.value ? 'block' : 'none' },
      }),
      loaded.value
        ? null
        : h('div', {
            onClick: () => {
              load()

              // re-initialize if the options is changed
              watch(
                [routeLocale, optionsLocale],
                (
                  [curRouteLocale, curPropsLocale],
                  [prevRouteLocale, prevPropsLocale]
                ) => {
                  if (curRouteLocale === prevRouteLocale) return
                  if (
                    JSON.stringify(curPropsLocale) !==
                    JSON.stringify(prevPropsLocale)
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
            },
            // search button template (same content as in @docsearch/js)
            innerHTML:
              '<button type="button" class="DocSearch DocSearch-Button" aria-label="Search"><span class="DocSearch-Button-Container"><svg width="20" height="20" class="DocSearch-Search-Icon" viewBox="0 0 20 20"><path d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="DocSearch-Button-Placeholder">Search</span></span><span class="DocSearch-Button-Keys"><kbd class="DocSearch-Button-Key"><svg width="15" height="15" class="DocSearch-Control-Key-Icon"><path d="M4.505 4.496h2M5.505 5.496v5M8.216 4.496l.055 5.993M10 7.5c.333.333.5.667.5 1v2M12.326 4.5v5.996M8.384 4.496c1.674 0 2.116 0 2.116 1.5s-.442 1.5-2.116 1.5M3.205 9.303c-.09.448-.277 1.21-1.241 1.203C1 10.5.5 9.513.5 8V7c0-1.57.5-2.5 1.464-2.494.964.006 1.134.598 1.24 1.342M12.553 10.5h1.953" stroke-width="1.2" stroke="currentColor" fill="none" stroke-linecap="square"></path></svg></kbd><kbd class="DocSearch-Button-Key">K</kbd></span></button>',
          }),
    ]
  },
})
