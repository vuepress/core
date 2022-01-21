import type {
  DefaultThemeLocaleData,
  DefaultThemeLocaleOptions,
} from '../../shared'

export const DEFAULT_LOCALE_OPTIONS: DefaultThemeLocaleOptions = {
  // navbar
  navbar: [],
  logo: null,
  darkMode: true,
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
  toggleDarkMode: 'toggle dark mode',
  toggleSidebar: 'toggle sidebar',
}

export const DEFAULT_LOCALE_DATA: DefaultThemeLocaleData = {
  // navbar
  selectLanguageName: 'English',
}

/**
 * Assign default options to `themeConfig`
 */
export const assignDefaultLocaleOptions = (
  localeOptions: DefaultThemeLocaleOptions
): void => {
  if (!localeOptions.locales) {
    localeOptions.locales = {}
  }

  if (!localeOptions.locales['/']) {
    localeOptions.locales['/'] = {}
  }

  Object.assign(localeOptions, {
    ...DEFAULT_LOCALE_OPTIONS,
    ...localeOptions,
  })

  Object.assign(localeOptions.locales['/'], {
    ...DEFAULT_LOCALE_DATA,
    ...localeOptions.locales['/'],
  })
}
