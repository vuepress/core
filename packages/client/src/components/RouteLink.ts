import { h } from 'vue'
import type { FunctionalComponent, HTMLAttributes, VNode } from 'vue'
import { useRouter } from 'vue-router'
import { resolveRoutePath } from '../router/index.js'
import { withBase } from '../utils/index.js'

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

export interface RouteLinkProps extends HTMLAttributes {
  /**
   * Whether the link is active to have an active class
   *
   * Notice that the active status is not automatically determined according to the current route.
   *
   * @default false
   */
  active?: boolean

  /**
   * The class to add when the link is active
   *
   * @default 'route-link-active'
   */
  activeClass?: string

  /**
   * The route path to link to
   */
  to: string
}

/**
 * Component to render a link to another route.
 *
 * It's similar to `RouterLink` in `vue-router`, but more lightweight.
 *
 * It's recommended to use `RouteLink` in VuePress.
 */
export const RouteLink: FunctionalComponent<
  RouteLinkProps,
  Record<never, never>,
  {
    default: () => string | VNode | (string | VNode)[]
  }
> = (
  { active = false, activeClass = 'route-link-active', to, ...attrs },
  { slots },
) => {
  const router = useRouter()
  const resolvedPath = resolveRoutePath(to)

  const path =
    // only anchor or query
    resolvedPath.startsWith('#') || resolvedPath.startsWith('?')
      ? resolvedPath
      : withBase(resolveRoutePath(to))

  return h(
    'a',
    {
      ...attrs,
      class: ['route-link', { [activeClass]: active }],
      href: path,
      onClick: (event: MouseEvent = {} as MouseEvent) => {
        guardEvent(event) ? router.push(to).catch() : Promise.resolve()
      },
    },
    slots.default?.(),
  )
}

RouteLink.displayName = 'RouteLink'
RouteLink.props = {
  active: Boolean,
  activeClass: String,
  to: String,
}
