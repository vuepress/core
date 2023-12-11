import { isPlainObject, isString } from '@vuepress/shared'
import type { HeadConfig, VuepressSSRContext } from '@vuepress/shared'
import { onMounted, provide, useSSRContext, watch } from 'vue'
import {
  updateHeadSymbol,
  usePageHead,
  usePageLang,
} from './composables/index.js'
import type { UpdateHead } from './composables/index.js'

/**
 * Auto update head and provide as global util
 */
export const setupUpdateHead = (): void => {
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

  const managedHeadElements: HTMLElement[] = []

  // load current head tags from DOM
  const loadHead = (): void => {
    head.value.map(queryHeadElement).forEach((el) => {
      if (el && managedHeadElements.every((head) => !head.isEqualNode(el))) {
        managedHeadElements.push(el)
      }
    })
  }

  // update html lang attribute and head tags to DOM
  const updateHead: UpdateHead = () => {
    document.documentElement.lang = lang.value

    managedHeadElements.forEach((item) => {
      if (item.parentNode === document.head) {
        document.head.removeChild(item)
      }
    })

    const newHeadElements = head.value
      .map(createHeadElement)
      .filter(Boolean) as HTMLElement[]

    managedHeadElements.forEach((el, index) => {
      const matchedIndex = newHeadElements.findIndex(
        (newEl) => newEl?.isEqualNode(el ?? null),
      )

      if (matchedIndex === -1) {
        el?.remove()
        delete managedHeadElements[index]
      } else {
        delete newHeadElements[matchedIndex]
      }
    })

    newHeadElements.forEach((el) => {
      document.head.appendChild(el)
    })
    managedHeadElements.push(...newHeadElements)
  }
  provide(updateHeadSymbol, updateHead)

  onMounted(() => {
    loadHead()
    if (__VUEPRESS_DEV__) updateHead()
    watch(
      () => head.value,
      () => {
        if (__VUEPRESS_DEV__) loadHead()
        updateHead()
      },
    )
  })
}

/**
 * Query the matched head tag of head config
 */
export const queryHeadElement = ([
  tagName,
  attrs,
  content = '',
]: HeadConfig): HTMLElement | null => {
  const attrsSelector = Object.entries(attrs)
    .map(([key, value]) => {
      if (isString(value)) {
        return `[${key}=${JSON.stringify(value)}]`
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
export const createHeadElement = ([
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
