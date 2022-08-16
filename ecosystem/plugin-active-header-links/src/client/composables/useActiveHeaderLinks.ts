import { usePageData } from '@vuepress/client'
import { debounce } from 'ts-debounce'
import { onBeforeUnmount, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { Router } from 'vue-router'

export interface UseActiveHeaderLinksOptions {
  headerLinkSelector: string
  headerAnchorSelector: string
  delay: number
  offset?: number
}

export const useActiveHeaderLinks = ({
  headerLinkSelector,
  headerAnchorSelector,
  delay,
  offset = 5,
}: UseActiveHeaderLinksOptions): void => {
  const router = useRouter()
  const page = usePageData()

  const setActiveRouteHash = (): void => {
    // get current scrollTop
    const scrollTop = Math.max(
      window.scrollY,
      document.documentElement.scrollTop,
      document.body.scrollTop
    )
    // check if we are at page top
    const isAtPageTop = Math.abs(scrollTop - 0) < offset
    if (isAtPageTop) {
      // replace current route hash with empty string
      replaceWithoutScrollBehavior(router, {
        hash: '',
        force: true,
      })
      return
    }

    // get current scrollBottom
    const scrollBottom = window.innerHeight + scrollTop
    // get the total scroll length of current page
    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    )
    // check if we have reached page bottom
    // notice the `scrollBottom` might not be exactly equal to `scrollHeight`, so we add offset here
    const isAtPageBottom = Math.abs(scrollHeight - scrollBottom) < offset

    // get all header links
    const headerLinks: HTMLAnchorElement[] = Array.from(
      document.querySelectorAll(headerLinkSelector)
    )
    // get all header anchors
    const headerAnchors: HTMLAnchorElement[] = Array.from(
      document.querySelectorAll(headerAnchorSelector)
    )
    // filter anchors that do not have corresponding links
    const existedHeaderAnchors = headerAnchors.filter((anchor) =>
      headerLinks.some((link) => link.hash === anchor.hash)
    )

    for (let i = 0; i < existedHeaderAnchors.length; i++) {
      const anchor = existedHeaderAnchors[i]
      const nextAnchor = existedHeaderAnchors[i + 1]

      // notice the `scrollTop` might not be exactly equal to `offsetTop` after clicking the anchor
      // so we add offset

      // if has scrolled past this anchor
      const hasPassedCurrentAnchor =
        scrollTop >= (anchor.parentElement?.offsetTop ?? 0) - offset

      // if has not scrolled past next anchor
      const hasNotPassedNextAnchor =
        !nextAnchor ||
        scrollTop < (nextAnchor.parentElement?.offsetTop ?? 0) - offset

      // if this anchor is the active anchor
      const isActive = hasPassedCurrentAnchor && hasNotPassedNextAnchor

      // continue to find the active anchor
      if (!isActive) continue

      const routeHash = decodeURIComponent(router.currentRoute.value.hash)
      const anchorHash = decodeURIComponent(anchor.hash)

      // if the active anchor hash is current route hash, do nothing
      if (routeHash === anchorHash) return

      // check if anchor is at the bottom of the page to keep hash consistent
      if (isAtPageBottom) {
        for (let j = i + 1; j < existedHeaderAnchors.length; j++) {
          // if current route hash is below the active hash, do nothing
          if (routeHash === decodeURIComponent(existedHeaderAnchors[j].hash)) {
            return
          }
        }
      }

      // replace current route hash with the active anchor hash
      replaceWithoutScrollBehavior(router, {
        hash: anchorHash,
        force: true,
      })
      return
    }
  }

  const onScroll: () => Promise<void> = debounce(setActiveRouteHash, delay)

  onMounted(() => {
    onScroll()
    window.addEventListener('scroll', onScroll)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
  })
  watch(() => page.value.path, onScroll)
}

/**
 * Call `router.replace()` and do not trigger `scrollBehavior`
 */
export const replaceWithoutScrollBehavior = async (
  router: Router,
  ...args: Parameters<Router['replace']>
): Promise<void> => {
  // temporarily disable `scrollBehavior`
  // restore it after navigation
  const { scrollBehavior } = router.options
  router.options.scrollBehavior = undefined
  await router
    .replace(...args)
    .finally(() => (router.options.scrollBehavior = scrollBehavior))
}
