import { useRouteLocale } from '@vuepress/client'
import { usePwaEvent, useSkipWaiting } from '@vuepress/plugin-pwa/client'
import type { LocaleConfig } from '@vuepress/shared'
import type { PropType } from 'vue'
import { computed, defineComponent, h, ref, Transition } from 'vue'

import '../styles/vars.css'
import '../styles/pwa-popup.css'

export type PwaPopupLocales = LocaleConfig<{
  message: string
  buttonText: string
}>

export const PwaPopup = defineComponent({
  name: 'PwaPopup',

  props: {
    locales: {
      type: Object as PropType<PwaPopupLocales>,
      required: false,
      default: () => ({}),
    },
  },

  setup(props) {
    const event = usePwaEvent()
    const routeLocale = useRouteLocale()

    const locale = computed(
      () =>
        props.locales[routeLocale.value] ?? {
          message: 'New content is available.',
          buttonText: 'Refresh',
        }
    )

    const show = ref(false)
    const registration = ref<ServiceWorkerRegistration | null>(null)
    const onClick = (): void => {
      show.value = false
      if (registration.value) {
        useSkipWaiting(registration.value)
        // @ts-expect-error: Firefox supports a non-standard forceGet boolean parameter for location.reload()
        location.reload(true)
      }
    }

    event.on('updated', (reg) => {
      if (reg) {
        registration.value = reg
        show.value = true
      }
    })

    return () =>
      h(
        Transition,
        {
          name: 'pwa-popup',
        },
        () =>
          show.value
            ? h(
                'div',
                {
                  class: 'pwa-popup',
                },
                [
                  locale.value.message,
                  h('br'),
                  h(
                    'button',
                    {
                      onClick,
                    },
                    locale.value.buttonText
                  ),
                ]
              )
            : null
      )
  },
})

export default PwaPopup
