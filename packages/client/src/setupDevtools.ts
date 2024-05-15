import { setupDevtoolsPlugin } from '@vue/devtools-api'
import { watch } from 'vue'
import type { App } from 'vue'
import type { ClientData } from './types/index.js'

const PLUGIN_ID = 'org.vuejs.vuepress'
const PLUGIN_LABEL = 'VuePress'
const PLUGIN_COMPONENT_STATE_TYPE = PLUGIN_LABEL

const INSPECTOR_ID = PLUGIN_ID
const INSPECTOR_LABEL = PLUGIN_LABEL
const INSPECTOR_CLIENT_DATA_ID = 'client-data'
const INSPECTOR_CLIENT_DATA_LABEL = 'Client Data'

export const setupDevtools = (app: App, clientData: ClientData): void => {
  setupDevtoolsPlugin(
    {
      // fix recursive reference
      app: app as any,
      id: PLUGIN_ID,
      label: PLUGIN_LABEL,
      packageName: '@vuepress/client',
      homepage: 'https://v2.vuepress.vuejs.org',
      logo: 'https://v2.vuepress.vuejs.org/images/hero.png',
      componentStateTypes: [PLUGIN_COMPONENT_STATE_TYPE],
    },
    (api) => {
      const clientDataEntries = Object.entries(clientData)
      const clientDataKeys = Object.keys(clientData)
      const clientDataValues = Object.values(clientData)

      // setup component state
      api.on.inspectComponent((payload) => {
        payload.instanceData.state.push(
          ...clientDataEntries.map(([name, item]) => ({
            type: PLUGIN_COMPONENT_STATE_TYPE,
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
            id: INSPECTOR_CLIENT_DATA_ID,
            label: INSPECTOR_CLIENT_DATA_LABEL,
            children: clientDataKeys.map((name) => ({
              id: name,
              label: name,
            })),
          },
        ]
      })
      api.on.getInspectorState((payload) => {
        if (payload.inspectorId !== INSPECTOR_ID) return
        if (payload.nodeId === INSPECTOR_CLIENT_DATA_ID) {
          payload.state = {
            [INSPECTOR_CLIENT_DATA_LABEL]: clientDataEntries.map(
              ([name, item]) => ({
                key: name,
                value: item.value,
              }),
            ),
          }
        }
        if (clientDataKeys.includes(payload.nodeId)) {
          payload.state = {
            [INSPECTOR_CLIENT_DATA_LABEL]: [
              {
                key: payload.nodeId,
                value: clientData[payload.nodeId].value,
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
