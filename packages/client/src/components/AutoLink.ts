import { isLinkWithProtocol } from '@vuepress/shared'
import type { SlotsType, VNode } from 'vue'
import { computed, defineComponent, h } from 'vue'
import { useRoute } from 'vue-router'
import { useSiteData } from '../composables/index.js'
import { RouteLink } from './RouteLink.js'

export interface AutoLinkProps {
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
    /**
     * Pattern to determine if the link should be active, which has higher priority than `exact`
     */
    activeMatch: {
      type: [String, RegExp],
      default: '',
    },

    /**
     * The `aria-label` attribute
     */
    ariaLabel: {
      type: String,
      default: '',
    },

    /**
     * Whether the link should be active only if the url is an exact match
     */
    exact: Boolean,

    /**
     * URL of the auto link
     */
    link: {
      type: String,
      required: true,
    },

    /**
     * The `rel` attribute
     */
    rel: {
      type: String,
      default: '',
    },

    /**
     * The `target` attribute
     */
    target: {
      type: String,
      default: '',
    },

    /**
     * Text of the auto link
     */
    text: {
      type: String,
      required: true,
    },
  },

  slots: Object as SlotsType<{
    default?: () => VNode[] | VNode
    before?: () => VNode[] | VNode | null
    after?: () => VNode[] | VNode | null
  }>,

  setup(props, { slots }) {
    const route = useRoute()
    const siteData = useSiteData()

    // If the link has non-http protocol
    const withProtocol = computed(() => isLinkWithProtocol(props.link))

    // Resolve the `target` attr
    const linkTarget = computed(
      () => props.target || (withProtocol.value ? '_blank' : undefined),
    )

    // If the `target` attr is "_blank"
    const isBlankTarget = computed(() => linkTarget.value === '_blank')

    // Whether the link is internal
    const isInternal = computed(
      () => !withProtocol.value && !isBlankTarget.value,
    )

    // Resolve the `rel` attr
    const linkRel = computed(
      () => props.rel || (isBlankTarget.value ? 'noopener noreferrer' : null),
    )

    // Resolve the `aria-label` attr
    const linkAriaLabel = computed(() => props.ariaLabel ?? props.text)

    // Should be active when current route is a subpath of this link
    const shouldBeActiveInSubpath = computed(() => {
      // Should not be active in `exact` mode
      if (props.exact) return false

      const localePaths = Object.keys(siteData.value.locales)

      return localePaths.length
        ? // Check all the locales
          localePaths.every((key) => key !== props.link)
        : // Check root
          props.link !== '/'
    })

    // If this link is active
    const isActive = computed(() => {
      if (!isInternal.value) return false

      if (props.activeMatch) {
        return (
          props.activeMatch instanceof RegExp
            ? props.activeMatch
            : new RegExp(props.activeMatch, 'u')
        ).test(route.path)
      }

      // If this link is active in subpath
      if (shouldBeActiveInSubpath.value) {
        return route.path.startsWith(props.link)
      }

      return route.path === props.link
    })

    return (): VNode => {
      const { before, after, default: defaultSlot } = slots

      const content = defaultSlot?.() || [before?.(), props.text, after?.()]

      return isInternal.value
        ? h(
            RouteLink,
            {
              'class': 'auto-link',
              'to': props.link,
              'active': isActive.value,
              'aria-label': linkAriaLabel.value,
            },
            () => content,
          )
        : h(
            'a',
            {
              'class': 'auto-link external-link',
              'href': props.link,
              'aria-label': linkAriaLabel.value,
              'rel': linkRel.value,
              'target': linkTarget.value,
            },
            content,
          )
    }
  },
})
