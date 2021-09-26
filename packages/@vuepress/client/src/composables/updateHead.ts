import { isPlainObject, isString } from '@vuepress/shared'
import type { HeadConfig, VuepressSSRContext } from '@vuepress/shared'
import { inject, onMounted, provide, ref, useSSRContext, watch } from 'vue'
import type { InjectionKey } from 'vue'
import { useRoute } from 'vue-router'
import { usePageHead } from './pageHead'
import { usePageLang } from './pageLang'

/**
 * A util function to force update `<head>` of current page
 */
export type UpdateHead = () => void

/**
 * Injection key for `updateHead` util
 */
export const updateHeadSymbol: InjectionKey<UpdateHead> = Symbol(
  __VUEPRESS_DEV__ ? 'updateHead' : ''
)

/**
 * Returns the `updateHead` util
 */
export const useUpdateHead = (): UpdateHead => {
  const updateHead = inject(updateHeadSymbol)
  if (!updateHead) {
    throw new Error('useUpdateHead() is called without provider.')
  }
  return updateHead
}

/**
 * Auto update head and provide as global util in setup
 */
export const setupUpdateHead = (): void => {
  const route = useRoute()
  const head = usePageHead()
  const lang = usePageLang()

  // ssr-only, extract page meta info to ssrContext
  if (__VUEPRESS_SSR__) {
    const ssrContext: VuepressSSRContext | undefined = useSSRContext()
    if (ssrContext) {
      ssrContext.head = head.value
      ssrContext.lang = lang.value
    }
    return
  }

  const headTags = ref<HTMLElement[]>([])

  // load current head tags from DOM
  const loadHead = (): void => {
    head.value.forEach((item) => {
      const tag = queryHeadTag(item)
      if (tag) {
        headTags.value.push(tag)
      }
    })
  }

  // update html lang attribute and head tags to DOM
  const updateHead: UpdateHead = () => {
    document.documentElement.lang = lang.value

    headTags.value.forEach((item) => {
      if (item.parentNode === document.head) {
        document.head.removeChild(item)
      }
    })
    headTags.value.splice(0, headTags.value.length)

    head.value.forEach((item) => {
      const tag = createHeadTag(item)
      if (tag !== null) {
        document.head.appendChild(tag)
        headTags.value.push(tag)
      }
    })
  }
  provide(updateHeadSymbol, updateHead)

  onMounted(() => {
    loadHead()
    updateHead()
    // only update head on route change
    watch(
      () => route.path,
      () => updateHead()
    )
  })
}

/**
 * Query the matched head tag of head config
 */
export const queryHeadTag = ([
  tagName,
  attrs,
  content = '',
]: HeadConfig): HTMLElement | null => {
  const attrsSelector = Object.entries(attrs)
    .map(([key, value]) => {
      if (isString(value)) {
        return `[${key}="${value}"]`
      }
      if (value === true) {
        return `[${key}]`
      }
      return ''
    })
    .join('')

  const selector = `head > ${tagName}${attrsSelector}`
  const tags = Array.from(document.querySelectorAll<HTMLElement>(selector))
  const matchedTag = tags.find((item) => item.innerText === content)
  return matchedTag || null
}

/**
 * Create head tag from head config
 */
export const createHeadTag = ([
  tagName,
  attrs,
  content,
]: HeadConfig): HTMLElement | null => {
  if (!isString(tagName)) {
    return null
  }

  // create element
  const tag = document.createElement(tagName)

  // set attributes
  if (isPlainObject(attrs)) {
    Object.entries(attrs).forEach(([key, value]) => {
      if (isString(value)) {
        tag.setAttribute(key, value)
      } else if (value === true) {
        tag.setAttribute(key, '')
      }
    })
  }

  // set content
  if (isString(content)) {
    tag.appendChild(document.createTextNode(content))
  }

  return tag
}
