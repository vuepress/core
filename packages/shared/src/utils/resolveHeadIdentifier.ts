import type { HeadConfig } from '../types/index.js'

const TAGS_ALLOWED = ['link', 'meta', 'script', 'style', 'noscript', 'template']
const TAGS_UNIQUE = ['title', 'base']

/**
 * Resolve identifier of a tag, to avoid duplicated tags in `<head>`
 */
export const resolveHeadIdentifier = ([tag, attrs, content]: HeadConfig):
  | string
  | null => {
  // avoid duplicated unique tags
  if (TAGS_UNIQUE.includes(tag)) {
    return tag
  }

  // avoid disallowed tags
  if (!TAGS_ALLOWED.includes(tag)) {
    return null
  }

  // avoid duplicated `<meta>` with same `name`
  if (tag === 'meta' && attrs.name) {
    return `${tag}.${attrs.name}`
  }

  // avoid duplicated `<template>` with same `id`
  if (tag === 'template' && attrs.id) {
    return `${tag}.${attrs.id}`
  }

  return JSON.stringify([
    tag,
    Object.entries(attrs)
      .map(([key, value]) => {
        // normalize boolean attributes
        if (typeof value === 'boolean') {
          return value ? [key, ''] : null
        }
        return [key, value]
      })
      .filter((item): item is [string, string] => item != null)
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB)),
    content,
  ])
}
