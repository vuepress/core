import {
  defineThemeData as _defineThemeData,
  useThemeData as _useThemeData,
  useThemeLocaleData as _useThemeLocaleData,
} from '@vuepress/plugin-theme-data/client'
import type { DefaultThemeData } from '../../shared/index.js'

const THEME_DATA_DEFAULTS: DefaultThemeData = {
  // color mode
  colorMode: 'auto',
  colorModeSwitch: true,

  // navbar
  navbar: [],
  logo: null,
  repo: null,
  selectLanguageText: 'Languages',
  selectLanguageAriaLabel: 'Select language',

  // sidebar
  sidebar: 'auto',
  sidebarDepth: 2,

  // page meta
  editLink: true,
  editLinkText: 'Edit this page',
  lastUpdated: true,
  lastUpdatedText: 'Last Updated',
  contributors: true,
  contributorsText: 'Contributors',

  // 404 page messages
  notFound: [
    `There's nothing here.`,
    `How did we get here?`,
    `That's a Four-Oh-Four.`,
    `Looks like we've got some broken links.`,
  ],
  backToHome: 'Take me home',

  // a11y
  openInNewWindow: 'open in new window',
  toggleColorMode: 'toggle color mode',
  toggleSidebar: 'toggle sidebar',
}

export const useThemeData = _useThemeData<DefaultThemeData>
export const useThemeLocaleData = _useThemeLocaleData<DefaultThemeData>
export const defineThemeData = (themeData: DefaultThemeData): void =>
  _defineThemeData({
    ...THEME_DATA_DEFAULTS,
    ...themeData,
  })
