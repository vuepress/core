import { isLinkWithProtocol } from '@vuepress/shared'
import type { PropType, SlotsType, VNode } from 'vue'
import { computed, defineComponent, h, toRef } from 'vue'
import { useRoute } from 'vue-router'
import { useSiteData } from '../composables/index.js'
import { RouteLink } from './RouteLink.js'

export interface AutoLinkProps {
  /**
   * Text of item
   *
   * 项目文字
   */
  text: string

  /**
   * Aria label of item
   *
   * 项目无障碍标签
   */
  ariaLabel?: string

  /**
   * Link of item
   *
   * 当前页面链接
   */
  link: string

  /**
   * Rel of `<a>` tag
   *
   * `<a>` 标签的 `rel` 属性
   */
  rel?: string

  /**
   * Target of `<a>` tag
   *
   * `<a>` 标签的 `target` 属性
   */
  target?: string

  /**
   * Regexp mode to be active
   *
   * 匹配激活的正则表达式
   */
  activeMatch?: string
}

export const AutoLink = defineComponent({
  name: 'AutoLink',

  props: {
    /**
     * @description Autolink config
     */
    config: {
      type: Object as PropType<AutoLinkProps>,
      required: true,
    },

    /**
     * @description Whether it's active only when exact match
     */
    exact: Boolean,
  },

  slots: Object as SlotsType<{
    default?: () => VNode[] | VNode
    before?: () => VNode[] | VNode | null
    after?: () => VNode[] | VNode | null
  }>,

  setup(props, { slots }) {
    const route = useRoute()
    const siteData = useSiteData()

    const config = toRef(props, 'config')

    // If the link has non-http protocol
    const withProtocol = computed(() => isLinkWithProtocol(config.value.link))

    // Resolve the `target` attr
    const linkTarget = computed(
      () => config.value.target || (withProtocol.value ? '_blank' : undefined),
    )

    // If the `target` attr is "_blank"
    const isBlankTarget = computed(() => linkTarget.value === '_blank')

    // Render `<RouteLink>` or not
    const renderRouteLink = computed(
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
      () => config.value.ariaLabel || config.value.text,
    )

    // Should be active when current route is a subpath of this link
    const shouldBeActiveInSubpath = computed(() => {
      // Should not be active in `exact` mode
      if (props.exact) return false

      const localeKeys = Object.keys(siteData.value.locales)

      return localeKeys.length
        ? // Check all the locales
          localeKeys.every((key) => key !== config.value.link)
        : // Check root
          config.value.link !== '/'
    })

    // If this link is active
    const isActive = computed(() =>
      renderRouteLink.value
        ? config.value.activeMatch
          ? new RegExp(config.value.activeMatch, 'u').test(route.path)
          : // If this link is active in subpath
            shouldBeActiveInSubpath.value
            ? route.path.startsWith(config.value.link)
            : route.path === config.value.link
        : false,
    )

    return (): VNode => {
      const { text, link } = config.value
      const { before, after, default: defaultSlot } = slots

      const content = defaultSlot?.() || [
        before ? before() : null,
        text,
        after?.(),
      ]

      return renderRouteLink.value
        ? h(
            RouteLink,
            {
              'class': 'auto-link',
              'to': link,
              'active': isActive.value,
              'aria-label': linkAriaLabel.value,
              // Class needs to be merged manually
            },
            () => content,
          )
        : h(
            'a',
            {
              'class': 'auto-link anchor-link',
              'href': link,
              'rel': linkRel.value,
              'target': linkTarget.value,
              'aria-label': linkAriaLabel.value,
            },
            content,
          )
    }
  },
})
