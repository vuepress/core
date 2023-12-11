import { isPlainObject, isString } from '@vuepress/shared'
import type { HeadConfig, VuepressSSRContext } from '@vuepress/shared'
import { onMounted, provide, useSSRContext, watch } from 'vue'
import {
  updateHeadSymbol,
  usePageHead,
  usePageLang,
} from './composables/index.js'

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

  let managedHeadElements: (HTMLElement | null)[] = []
  let isFirstUpdate = true

  const updateHeadTags = (newTags: HeadConfig[]): void => {
    if (!__VUEPRESS_DEV__ && isFirstUpdate) {
      // in production, the initial meta tags are already pre-rendered so we
      // skip the first update.
      isFirstUpdate = false
      return
    }

    document.documentElement.lang = lang.value

    const newElements: (HTMLElement | null)[] = newTags.map(createHeadElement)

    managedHeadElements.forEach((oldEl, oldIndex) => {
      const matchedIndex = newElements.findIndex(
        (newEl) => newEl?.isEqualNode(oldEl ?? null),
      )

      if (matchedIndex === -1) {
        oldEl?.remove()
        delete managedHeadElements[oldIndex]
      } else {
        delete newElements[matchedIndex]
      }
    })

    newElements.forEach((el) => el && document.head.appendChild(el))
    managedHeadElements = [...managedHeadElements, ...newElements].filter(
      Boolean,
    )
  }
  provide(updateHeadSymbol, () => {
    updateHeadTags(head.value)
  })

  onMounted(() => {
    watch(
      () => head.value,
      () => {
        updateHeadTags(head.value)
      },
      { immediate: true },
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
