import { siteData as siteDataRaw } from '@internal/siteData'
import { shallowRef } from 'vue'
import type { SiteData, SiteDataRef } from '../types/index.js'

/**
 * Global site data ref
 */
export const siteData: SiteDataRef = shallowRef(siteDataRaw)

if (__VUEPRESS_DEV__ && (import.meta.webpackHot || import.meta.hot)) {
  // reuse vue HMR runtime
  __VUE_HMR_RUNTIME__.updateSiteData = (data: SiteData) => {
    siteData.value = data
  }
}
