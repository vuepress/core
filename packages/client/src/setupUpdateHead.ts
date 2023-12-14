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

  let managedHeadElements: HTMLElement[] = []

  /**
   * Take over the existing head elements
   */
  const takeOverHeadElements = (): void => {
    head.value.forEach((item) => {
      const tag = queryHeadElement(item)
      if (tag) managedHeadElements.push(tag)
    })
  }

  /**
   * Generate head elements from current head config
   */
  const generateHeadElements = (): HTMLElement[] => {
    const result: HTMLElement[] = []
    head.value.forEach((item) => {
      const tag = createHeadElement(item)
      if (tag) result.push(tag)
    })
    return result
  }

  /**
   * Update head elements
   */
  const updateHead: UpdateHead = () => {
    // set html lang attribute
    document.documentElement.lang = lang.value

    // generate new head elements from current head config
    const newHeadElements = generateHeadElements()

    // find the intersection of old and new head elements
    managedHeadElements.forEach((oldEl, oldIndex) => {
      const matchedIndex = newHeadElements.findIndex((newEl) =>
        oldEl.isEqualNode(newEl),
      )
      // remove the non-intersection from old elements
      if (matchedIndex === -1) {
        oldEl.remove()
        // use delete to make the index consistent
        delete managedHeadElements[oldIndex]
      }
      // keep the intersection in old elements, and remove it from new elements
      else {
        // use splice to avoid empty item in next loop
        newHeadElements.splice(matchedIndex, 1)
      }
    })
    // append the rest new elements to head
    newHeadElements.forEach((el) => document.head.appendChild(el))
    // update managed head elements
    managedHeadElements = [
      // filter out empty deleted items
      ...managedHeadElements.filter((item) => !!item),
      ...newHeadElements,
    ]
  }
  provide(updateHeadSymbol, updateHead)

  onMounted(() => {
    // in production, the initial head elements are already pre-rendered,
    // so we need to skip the first update and take over the existing elements.
    if (!__VUEPRESS_DEV__) {
      takeOverHeadElements()
    }
    watch(head, updateHead, { immediate: __VUEPRESS_DEV__ })
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
