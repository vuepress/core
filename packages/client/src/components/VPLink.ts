import { h } from 'vue'
import type { FunctionalComponent, VNode } from 'vue'
import { useRouter } from 'vue-router'
import { resolve, withBase } from '../helpers/index.js'
import { guardEvent } from '../utils/index.js'

export interface VPLinkProps {
  to: string
}

export const VPLink: FunctionalComponent<
  VPLinkProps,
  Record<never, never>,
  {
    default: () => string | VNode | (string | VNode)[]
  }
> = ({ to = '' }, { slots }) => {
  const router = useRouter()
  const path = withBase(resolve(to).path)

  return h(
    'a',
    {
      class: 'vp-link',
      href: path,
      onClick: (event: MouseEvent = {} as MouseEvent) => {
        guardEvent(event) ? router.push(to).catch() : Promise.resolve()
      },
    },
    slots.default?.(),
  )
}

VPLink.displayName = 'VPLink'
