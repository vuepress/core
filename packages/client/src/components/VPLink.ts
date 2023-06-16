import { inferRouteLink } from '@vuepress/shared'
import { type FunctionalComponent, h, type VNode } from 'vue'
import { type NavigationFailure, useRouter } from 'vue-router'
import { withBase } from '../helpers/index.js'
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
  const navigate = (
    event: MouseEvent = {} as MouseEvent
  ): Promise<void | NavigationFailure> =>
    guardEvent(event) ? router.push(to).catch() : Promise.resolve()

  return h(
    'a',
    {
      class: 'md-link',
      href: withBase(inferRouteLink(to)),
      onClick: navigate,
    },
    slots.default?.()
  )
}

VPLink.displayName = 'VPLink'
