import { isLinkWithProtocol } from '@vuepress/shared'
import type { SlotsType, VNode } from 'vue'
import { computed, defineComponent, h } from 'vue'
import { useRoute } from 'vue-router'
import { useSiteData } from '../composables/index.js'
import { RouteLink } from './RouteLink.js'

export interface AutoLinkConfig {
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
     * Text of item
     *
     * 项目文字
     */
    text: {
      type: String,
      required: true,
    },

    /**
     * Link of item
     *
     * 当前页面链接
     */
    link: {
      type: String,
      required: true,
    },

    /**
     * Aria label of item
     *
     * 项目无障碍标签
     */
    ariaLabel: {
      type: String,
      default: '',
    },

    /**
     * Rel of `<a>` tag
     *
     * `<a>` 标签的 `rel` 属性
     */
    rel: {
      type: String,
      default: '',
    },

    /**
     * Target of `<a>` tag
     *
     * `<a>` 标签的 `target` 属性
     */
    target: {
      type: String,
      default: '',
    },

    /**
     * Whether it's active only when exact match
     *
     * 是否当恰好匹配时激活
     */
    exact: Boolean,

    /**
     * Regexp mode to be active
     *
     * @description has higher priority than exact
     *
     * 匹配激活的正则表达式
     *
     * @description 比 exact 的优先级更高
     */
    activeMatch: {
      type: [String, RegExp],
      default: '',
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

      if (props.activeMatch)
        return (
          props.activeMatch instanceof RegExp
            ? props.activeMatch
            : new RegExp(props.activeMatch, 'u')
        ).test(route.path)

      // If this link is active in subpath
      if (shouldBeActiveInSubpath.value)
        return route.path.startsWith(props.link)

      return route.path === props.link
    })

    return (): VNode => {
      const { before, after, default: defaultSlot } = slots

      const content = defaultSlot?.() || [
        before ? before() : null,
        props.text,
        after?.(),
      ]

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
              'rel': linkRel.value,
              'target': linkTarget.value,
              'aria-label': linkAriaLabel.value,
            },
            content,
          )
    }
  },
})
