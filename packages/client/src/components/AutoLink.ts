import {
  isLinkWithProtocol,
  removeEndingSlash,
  splitPath,
} from '@vuepress/shared'
import type { PropType, SlotsType, VNode } from 'vue'
import { computed, defineComponent, h, toRef } from 'vue'
import { useRoute } from 'vue-router'

import { useSiteData } from '../composables/index.js'
import { isSelfTarget } from '../helpers/isSelfTarget.js'
import { withBase } from '../helpers/withBase.js'
import { resolveRoute } from '../router/index.js'
import { RouteLink } from './RouteLink.js'

export interface AutoLinkConfig {
  /**
   * Pattern to determine if the link should be active, which has higher priority than `exact`
   */
  activeMatch?: RegExp | string

  /**
   * The `aria-label` attribute
   */
  ariaLabel?: string

  /**
   * Whether the link should be active only if the url is an exact match
   */
  exact?: boolean

  /**
   * URL of the auto link
   */
  link: string

  /**
   * The `rel` attribute
   */
  rel?: string

  /**
   * The `target` attribute
   */
  target?: string

  /**
   * Text of the auto link
   */
  text: string
}

/**
 * Render a VuePress navigation link as `<RouteLink>` or an `<a>` for native navigation.
 */
export const AutoLink = defineComponent({
  name: 'AutoLink',

  props: {
    config: {
      type: Object as PropType<AutoLinkConfig>,
      required: true,
    },
  },

  slots: Object as SlotsType<{
    default?: (config: AutoLinkConfig) => VNode | VNode[]
    before?: (config: AutoLinkConfig) => VNode | VNode[] | null
    after?: (config: AutoLinkConfig) => VNode | VNode[] | null
  }>,

  setup(props, { attrs, slots }) {
    const config = toRef(props, 'config')
    const route = useRoute()
    const siteData = useSiteData()

    const withProtocol = computed(() => isLinkWithProtocol(config.value.link))

    const nativeHref = computed(() => {
      const { link } = config.value
      if (withProtocol.value) return link

      const { pathname } = splitPath(link)
      if (!pathname) return link

      // A link that already includes the base is an explicit browser URL.
      if (
        __VUEPRESS_BASE__ !== '/' &&
        (pathname.startsWith(__VUEPRESS_BASE__) ||
          pathname === removeEndingSlash(__VUEPRESS_BASE__))
      ) {
        return link
      }

      const { path, notFound } = resolveRoute(link, route.path)
      return notFound ? link : withBase(path)
    })

    // Resolve the `aria-label` attr
    const linkAriaLabel = computed(
      () => config.value.ariaLabel ?? config.value.text,
    )

    // Should be active when current route is a subpath of this link
    const shouldBeActiveInSubpath = computed(() => {
      // Should not be active in `exact` mode
      if (config.value.exact) return false

      const localePaths = Object.keys(siteData.value.locales)

      return localePaths.length
        ? // Check all the locales
          localePaths.every((key) => key !== config.value.link)
        : // Check root
          config.value.link !== '/'
    })

    // If this link is active
    const isActive = computed(() => {
      if (config.value.activeMatch) {
        return (
          config.value.activeMatch instanceof RegExp
            ? config.value.activeMatch
            : new RegExp(config.value.activeMatch, 'u')
        ).test(route.path)
      }

      // If this link is active in subpath
      if (shouldBeActiveInSubpath.value) {
        return route.path.startsWith(config.value.link)
      }

      return route.path === config.value.link
    })

    return () => {
      const { before, after, default: defaultSlot } = slots
      const target = Object.hasOwn(attrs, 'target')
        ? attrs.target
        : config.value.target || (withProtocol.value ? '_blank' : undefined)
      const isBlankTarget =
        typeof target === 'string' && target.toLowerCase() === '_blank'
      const isRouteLink =
        !withProtocol.value && isSelfTarget(target) && attrs.download == null
      const anchorProps = {
        'aria-label': linkAriaLabel.value,
        'rel':
          config.value.rel || (isBlankTarget ? 'noopener noreferrer' : null),
        target,
      }

      const content = defaultSlot?.(config.value) ?? [
        before?.(config.value),
        config.value.text,
        after?.(config.value),
      ]

      return isRouteLink
        ? h(
            RouteLink,
            {
              ...anchorProps,
              class: 'auto-link',
              to: config.value.link,
              active: isActive.value,
            },
            () => content,
          )
        : h(
            'a',
            {
              ...anchorProps,
              class: [
                'auto-link',
                { 'external-link': withProtocol.value || isBlankTarget },
              ],
              href: nativeHref.value,
            },
            content,
          )
    }
  },
})
