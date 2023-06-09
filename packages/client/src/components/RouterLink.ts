import {
  computed,
  type ComputedRef,
  defineComponent,
  h,
  type Ref,
  type SlotsType,
  toRef,
  unref,
  type VNode,
} from 'vue'
import {
  type NavigationFailure,
  type RouteLocation,
  useRoute,
  useRouter,
} from 'vue-router'
import { guardEvent } from '../utils/index.js'

export interface LinkOptions {
  route: ComputedRef<RouteLocation & { href: string }>
  href: Ref<string>
  isActive: Ref<boolean>
  navigate: (event?: MouseEvent) => Promise<void | NavigationFailure>
}

export const useLink = (link: string | Ref<string>): LinkOptions => {
  const router = useRouter()
  const currentRoute = useRoute()

  const route = computed(() => router.resolve(unref(link)))

  const isActive = computed<boolean>(
    () => route.value.path === currentRoute.path
  )

  const navigate = (
    event: MouseEvent = {} as MouseEvent
  ): Promise<void | NavigationFailure> =>
    guardEvent(event) ? router.push(unref(link)).catch() : Promise.resolve()

  return {
    route,
    href: computed(() => route.value.href),
    isActive,
    navigate,
  }
}

export const RouterLink = defineComponent({
  name: 'RouterLink',

  props: {
    /**
     * Link
     */
    to: {
      type: String,
      required: true,
    },
  },

  slots: Object as SlotsType<{
    default: (linkOptions: LinkOptions) => VNode | VNode[]
  }>,

  setup(props, { slots }) {
    const to = toRef(props, 'to')
    const linkOptions = useLink(to)

    return (): VNode =>
      h(
        'a',
        {
          class: ['vp-link', { 'vp-active': linkOptions.isActive.value }],
          href: linkOptions.href.value,
          onClick: linkOptions.navigate,
        },
        slots.default?.(linkOptions)
      )
  },
})
