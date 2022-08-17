import type { DocSearchProps } from '@docsearch/react'
import { useSiteData } from '@vuepress/client'
import { resolveRoutePathFromUrl } from '@vuepress/shared'
import { debounce } from 'ts-debounce'
import { useRouter } from 'vue-router'

const isSpecialClick = (event: MouseEvent): boolean =>
  event.button === 1 ||
  event.altKey ||
  event.ctrlKey ||
  event.metaKey ||
  event.shiftKey

/**
 * Get docsearch options to be compatible with VuePress
 */
export const useDocsearchShim = (): Partial<DocSearchProps> => {
  const router = useRouter()
  const site = useSiteData()

  return {
    // render the hit component with custom `onClick` handler
    hitComponent: ({ hit, children }) => {
      // the `hit.url` is full url with protocol and hostname
      // so we have to transform it to vue-router path
      const routePath = resolveRoutePathFromUrl(hit.url, site.value.base)

      return {
        type: 'a',
        ref: undefined,
        constructor: undefined,
        key: undefined,
        props: {
          href: hit.url,
          // handle `onClick` by `router.push`
          onClick: (event: MouseEvent) => {
            if (isSpecialClick(event)) {
              return
            }
            event.preventDefault()
            router.push(routePath)
          },
          children,
        },
        __v: null,
      } as unknown
    },

    // navigation behavior triggered by `onKeyDown` internally
    navigator: {
      // when pressing Enter without metaKey
      navigate: ({ itemUrl }) => {
        router.push(itemUrl)
      },
    },

    // add search debounce
    transformSearchClient: (searchClient) => {
      const searchWithDebounce = debounce(searchClient.search, 500)
      return {
        ...searchClient,
        search: async (...args) => searchWithDebounce(...args),
      }
    },
  } as Partial<DocSearchProps>
}
