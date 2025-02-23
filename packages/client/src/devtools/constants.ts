import type { InspectorNodeConfig } from './types.js'

export const PLUGIN_ID = 'org.vuejs.vuepress'
export const PLUGIN_LABEL = 'VuePress'

export const COMPONENT_STATE_TYPE = PLUGIN_LABEL

export const INSPECTOR_ID = PLUGIN_ID
export const INSPECTOR_LABEL = PLUGIN_LABEL

const INSPECTOR_NODE_INTERNAL = {
  id: 'INTERNAL',
  label: 'Internal',
  keys: ['layouts', 'routes', 'redirects'],
} as const satisfies InspectorNodeConfig

const INSPECTOR_NODE_SITE = {
  id: 'SITE',
  label: 'Site',
  keys: ['siteData', 'siteLocaleData'],
} as const satisfies InspectorNodeConfig

const INSPECTOR_NODE_ROUTE = {
  id: 'ROUTE',
  label: 'Route',
  keys: ['routePath', 'routeLocale'],
} as const satisfies InspectorNodeConfig

const INSPECTOR_NODE_PAGE = {
  id: 'PAGE',
  label: 'Page',
  keys: [
    'pageData',
    'pageFrontmatter',
    'pageLang',
    'pageHead',
    'pageHeadTitle',
    'pageLayout',
    'pageComponent',
  ],
} as const satisfies InspectorNodeConfig

export const INSPECTOR_NODES = {
  [INSPECTOR_NODE_INTERNAL.id]: INSPECTOR_NODE_INTERNAL,
  [INSPECTOR_NODE_SITE.id]: INSPECTOR_NODE_SITE,
  [INSPECTOR_NODE_ROUTE.id]: INSPECTOR_NODE_ROUTE,
  [INSPECTOR_NODE_PAGE.id]: INSPECTOR_NODE_PAGE,
}

export const INSPECTOR_STATE_SECTION_NAME = 'State'
