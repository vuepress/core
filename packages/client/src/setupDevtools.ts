import { setupDevtoolsPlugin } from '@vue/devtools-api'
import type { App } from 'vue'
import { watch } from 'vue'
import type { ClientData } from './types/index.js'

const PLUGIN_ID = 'org.vuejs.vuepress'
const PLUGIN_LABEL = 'VuePress'

const COMPONENT_STATE_TYPE = PLUGIN_LABEL
const INSPECTOR_ID = PLUGIN_ID
const INSPECTOR_LABEL = PLUGIN_LABEL

type ClientDataKey = keyof ClientData
type ClientDataValue = ClientData[ClientDataKey]

const DETAIL_LABEL = 'Detail'
const SITE_DATA_ID = 'site-data'
const SITE_DATA_LABEL = 'Site Data'
const SITE_DATA_KEYS: ClientDataKey[] = [
  'siteData',
  'siteLocaleData',
  'layouts',
]
const ROUTES_ID = 'route-data'
const ROUTES_LABEL = 'Routes'
const ROUTES_KEYS: ClientDataKey[] = [
  'routes',
  'redirects',
  'routePath',
  'routeLocale',
]
const PAGE_DATA_ID = 'page-data'
const PAGE_DATA_LABEL = 'Page Data'
const PAGE_DATA_KEYS: ClientDataKey[] = [
  'pageData',
  'pageFrontmatter',
  'pageLang',
  'pageHead',
  'pageHeadTitle',
  'pageLayout',
  'pageComponent',
]

/**
 * Expose devtools constants so that ecosystem can reuse them directly.
 */
export const DEVTOOLS = {
  COMPONENT_STATE_TYPE,
  INSPECTOR_ID,
  INSPECTOR_LABEL,
}

export const setupDevtools = (app: App, clientData: ClientData): void => {
  setupDevtoolsPlugin(
    {
      // fix recursive reference
      app: app as never,
      id: PLUGIN_ID,
      label: PLUGIN_LABEL,
      packageName: '@vuepress/client',
      homepage: 'https://vuepress.vuejs.org',
      logo: 'https://vuepress.vuejs.org/images/hero.png',
      componentStateTypes: [COMPONENT_STATE_TYPE],
    },
    (api) => {
      const clientDataEntries = Object.entries(clientData) as [
        ClientDataKey,
        ClientDataValue,
      ][]
      const clientDataKeys = Object.keys(clientData) as ClientDataKey[]
      const clientDataValues = Object.values(clientData) as ClientDataValue[]

      const getInspectorNode = (
        ids: string[],
      ): { id: string; label: string }[] =>
        ids.map((id) => ({
          id,
          label: id,
        }))

      const getInspectorState = (
        keys: ClientDataKey[],
      ): { key: ClientDataKey; value: ClientDataValue }[] =>
        keys.map((key) => ({
          key,
          value: clientData[key].value as ClientDataValue,
        }))

      // setup component state
      api.on.inspectComponent((payload) => {
        payload.instanceData.state.push(
          ...clientDataEntries.map(([name, item]) => ({
            type: COMPONENT_STATE_TYPE,
            editable: false,
            key: name,
            value: item.value,
          })),
        )
      })

      // setup custom inspector
      api.addInspector({
        id: INSPECTOR_ID,
        label: INSPECTOR_LABEL,
        icon: 'article',
      })
      api.on.getInspectorTree((payload) => {
        if (payload.inspectorId !== INSPECTOR_ID) return
        payload.rootNodes = [
          {
            id: SITE_DATA_ID,
            label: SITE_DATA_LABEL,
            children: getInspectorNode(SITE_DATA_KEYS),
          },
          {
            id: ROUTES_ID,
            label: ROUTES_LABEL,
            children: getInspectorNode(ROUTES_KEYS),
          },
          {
            id: PAGE_DATA_ID,
            label: PAGE_DATA_LABEL,
            children: getInspectorNode(PAGE_DATA_KEYS),
          },
        ]
      })
      api.on.getInspectorState((payload) => {
        if (payload.inspectorId !== INSPECTOR_ID) return
        if (payload.nodeId === SITE_DATA_ID) {
          payload.state = {
            [SITE_DATA_LABEL]: getInspectorState(SITE_DATA_KEYS),
          }
        }
        if (payload.nodeId === ROUTES_ID) {
          payload.state = {
            [ROUTES_LABEL]: getInspectorState(ROUTES_KEYS),
          }
        }
        if (payload.nodeId === PAGE_DATA_ID) {
          payload.state = {
            [PAGE_DATA_LABEL]: getInspectorState(PAGE_DATA_KEYS),
          }
        }

        if (clientDataKeys.includes(payload.nodeId as ClientDataKey)) {
          payload.state = {
            [DETAIL_LABEL]: [
              {
                key: payload.nodeId,
                value: clientData[payload.nodeId as ClientDataKey].value,
              },
            ],
          }
        }
      })

      // refresh the component state and inspector state
      watch(clientDataValues, () => {
        api.notifyComponentUpdate()
        api.sendInspectorState(INSPECTOR_ID)
      })
    },
  )
}
