import { useRouteLocale } from '@vuepress/client'
import { computed, defineComponent, h } from 'vue'
import type { PropType } from 'vue'
import type { ExternalLinkIconLocales } from '../../shared'

import '../styles/vars.css'
import '../styles/external-link-icon.css'

const svg = h(
  'svg',
  {
    'class': 'external-link-icon',
    'xmlns': 'http://www.w3.org/2000/svg',
    'aria-hidden': 'true',
    'focusable': 'false',
    'x': '0px',
    'y': '0px',
    'viewBox': '0 0 100 100',
    'width': '15',
    'height': '15',
  },
  [
    h('path', {
      fill: 'currentColor',
      d: 'M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z',
    }),
    h('polygon', {
      fill: 'currentColor',
      points:
        '45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9',
    }),
  ]
)

export const ExternalLinkIcon = defineComponent({
  name: 'ExternalLinkIcon',

  props: {
    locales: {
      type: Object as PropType<ExternalLinkIconLocales>,
      required: false,
      default: () => ({}),
    },
  },

  setup(props) {
    const routeLocale = useRouteLocale()
    const locale = computed(
      () =>
        props.locales[routeLocale.value] ?? {
          openInNewWindow: 'open in new window',
        }
    )
    return () =>
      h('span', [
        svg,
        h(
          'span',
          {
            class: 'external-link-icon-sr-only',
          },
          locale.value.openInNewWindow
        ),
      ])
  },
})
