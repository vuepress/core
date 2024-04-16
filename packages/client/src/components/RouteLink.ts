import { removeLeadingSlash } from '@vuepress/shared'
import { computed, defineComponent, h } from 'vue'
import type { SlotsType, VNode } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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

export interface RouteLinkProps {
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
export const RouteLink = defineComponent({
  name: 'RouteLink',

  props: {
    /**
     * The route path to link to
     */
    to: {
      type: String,
      required: true,
    },

    /**
     * Whether the link is active to have an active class
     *
     * Notice that the active status is not automatically determined according to the current route.
     */
    active: Boolean,

    /**
     * The class to add when the link is active
     */
    activeClass: {
      type: String,
      default: 'route-link-active',
    },
  },

  slots: Object as SlotsType<{
    default: () => string | VNode | (string | VNode)[]
  }>,

  setup(props, { slots }) {
    const router = useRouter()
    const route = useRoute()

    const path = computed(() =>
      props.to.startsWith('#') || props.to.startsWith('?')
        ? props.to
        : `${__VUEPRESS_BASE__}${removeLeadingSlash(resolveRoutePath(props.to, route.path))}`,
    )

    return () =>
      h(
        'a',
        {
          class: ['route-link', { [props.activeClass]: props.active }],
          href: path.value,
          onClick: (event: MouseEvent = {} as MouseEvent) => {
            if (guardEvent(event)) {
              router.push(props.to).catch()
            }
          },
        },
        slots.default?.(),
      )
  },
})
