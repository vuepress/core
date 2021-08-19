import { siteData as siteDataRaw } from '@internal/siteData'
import type { SiteData } from '@vuepress/shared'
import { ref } from 'vue'
import type { Ref } from 'vue'

export type { SiteData }

/**
 * Ref wrapper of `SiteData`
 */
export type SiteDataRef = Ref<SiteData>

/**
 * Global site data ref
 */
export const siteData: SiteDataRef = ref(siteDataRaw)

/**
 * Returns the ref of the site data
 */
export const useSiteData = (): SiteDataRef => siteData

if (import.meta.webpackHot || import.meta.hot) {
  // reuse vue HMR runtime
  __VUE_HMR_RUNTIME__.updateSiteData = (data: SiteData) => {
    siteData.value = data
  }
}
