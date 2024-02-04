import { h } from 'vue'
import type { FunctionalComponent, HTMLAttributes, VNode } from 'vue'
import { useRouter } from 'vue-router'
import { withBase } from '../helpers/index.js'
import { resolveRoutePath } from '../router/index.js'

/**
 * Forked from https://github.com/vuejs/router/blob/941b2131e80550009e5221d4db9f366b1fea3fd5/packages/router/src/RouterLink.ts#L293
 */
const guardEvent = (event: MouseEvent): boolean | void => {
  // don't redirect with control keys
  if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) return
  // don't redirect when preventDefault called
  if (event.defaultPrevented) return
  // don't redirect on right click
  if (event.button !== undefined && event.button !== 0) return
  // don't redirect if `target="_blank"`
  if (event.currentTarget) {
    const target = (event.currentTarget as HTMLElement).getAttribute('target')
    if (target?.match(/\b_blank\b/i)) return
  }
  event.preventDefault()
  return true
}

export interface VPLinkProps extends HTMLAttributes {
  to: string
  active?: boolean
}

export const VPLink: FunctionalComponent<
  VPLinkProps,
  Record<never, never>,
  {
    default: () => string | VNode | (string | VNode)[]
  }
> = ({ to = '', active = false, ...attrs }, { slots }) => {
  const router = useRouter()
  const path = withBase(resolveRoutePath(to))

  return h(
    'a',
    {
      class: ['vp-link', { 'vp-link-active': active }],
      href: path,
      ...attrs,
      onClick: (event: MouseEvent = {} as MouseEvent) => {
        guardEvent(event) ? router.push(to).catch() : Promise.resolve()
      },
    },
    slots.default?.(),
  )
}

VPLink.displayName = 'VPLink'
VPLink.props = {
  to: String,
  active: Boolean,
}
