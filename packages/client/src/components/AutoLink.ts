import { isLinkWithProtocol } from '@vuepress/shared'
import type { PropType, SlotsType, VNode } from 'vue'
import { computed, defineComponent, h, toRef } from 'vue'
import { useRoute } from 'vue-router'
import { useSiteData } from '../composables/index.js'
import { RouteLink } from './RouteLink.js'

export interface AutoLinkConfig {
  /**
   * Pattern to determine if the link should be active, which has higher priority than `exact`
   */
  activeMatch?: string | RegExp

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
 * Component to render a link automatically according to the link type
 *
 * - If the link is internal, it will be rendered as a `<RouteLink>`
 * - If the link is external, it will be rendered as a normal `<a>` tag
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
    default?: (config: AutoLinkConfig) => VNode[] | VNode
    before?: (config: AutoLinkConfig) => VNode[] | VNode | null
    after?: (config: AutoLinkConfig) => VNode[] | VNode | null
  }>,

  setup(props, { slots }) {
    const config = toRef(props, 'config')
    const route = useRoute()
    const siteData = useSiteData()

    // If the link has non-http protocol
    const withProtocol = computed(() => isLinkWithProtocol(config.value.link))

    // Resolve the `target` attr
    const linkTarget = computed(
      () => config.value.target || (withProtocol.value ? '_blank' : undefined),
    )

    // If the `target` attr is "_blank"
    const isBlankTarget = computed(() => linkTarget.value === '_blank')

    // Whether the link is internal
    const isInternal = computed(
      () => !withProtocol.value && !isBlankTarget.value,
    )

    // Resolve the `rel` attr
    const linkRel = computed(
      () =>
        config.value.rel ||
        (isBlankTarget.value ? 'noopener noreferrer' : null),
    )

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
      if (!isInternal.value) return false

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

      const content = defaultSlot?.(config.value) || [
        before?.(config.value),
        config.value.text,
        after?.(config.value),
      ]

      return isInternal.value
        ? h(
            RouteLink,
            {
              'class': 'auto-link',
              'to': config.value.link,
              'active': isActive.value,
              'aria-label': linkAriaLabel.value,
            },
            () => content,
          )
        : h(
            'a',
            {
              'class': 'auto-link external-link',
              'href': config.value.link,
              'aria-label': linkAriaLabel.value,
              'rel': linkRel.value,
              'target': linkTarget.value,
            },
            content,
          )
    }
  },
})
