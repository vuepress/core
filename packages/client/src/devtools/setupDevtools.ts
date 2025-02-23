import { setupDevtoolsPlugin } from '@vue/devtools-api'
import type { App } from 'vue'
import { watch } from 'vue'
import type { ClientData } from '../types/index.js'
import * as DEVTOOLS from './constants.js'
import type {
  ClientDataKey,
  ClientDataValue,
  InspectorNodeConfig,
} from './types.js'

export const setupDevtools = (app: App, clientData: ClientData): void => {
  setupDevtoolsPlugin(
    {
      // fix recursive reference
      app: app as never,
      id: DEVTOOLS.PLUGIN_ID,
      label: DEVTOOLS.PLUGIN_LABEL,
      packageName: '@vuepress/client',
      homepage: 'https://vuepress.vuejs.org',
      logo: 'https://vuepress.vuejs.org/images/hero.png',
      componentStateTypes: [DEVTOOLS.COMPONENT_STATE_TYPE],
    },
    (api) => {
      const clientDataEntries = Object.entries(clientData) as [
        ClientDataKey,
        ClientDataValue,
      ][]
      const clientDataKeys = Object.keys(clientData) as ClientDataKey[]
      const clientDataValues = Object.values(clientData) as ClientDataValue[]

      // setup component state
      api.on.inspectComponent((payload) => {
        payload.instanceData.state.push(
          ...clientDataEntries.map(([name, item]) => ({
            type: DEVTOOLS.COMPONENT_STATE_TYPE,
            editable: false,
            key: name,
            value: item.value,
          })),
        )
      })

      // setup custom inspector
      api.addInspector({
        id: DEVTOOLS.INSPECTOR_ID,
        label: DEVTOOLS.INSPECTOR_LABEL,
        icon: 'article',
      })

      api.on.getInspectorTree((payload) => {
        if (payload.inspectorId !== DEVTOOLS.INSPECTOR_ID) return

        payload.rootNodes = Object.values(DEVTOOLS.INSPECTOR_NODES).map(
          (node) => ({
            id: node.id,
            label: node.label,
            children: node.keys.map((key: ClientDataKey) => ({
              id: key,
              label: key,
            })),
          }),
        )
      })

      api.on.getInspectorState((payload) => {
        if (payload.inspectorId !== DEVTOOLS.INSPECTOR_ID) return

        // root nodes state
        const inspectorNode = DEVTOOLS.INSPECTOR_NODES[payload.nodeId] as
          | InspectorNodeConfig
          | undefined
        if (inspectorNode) {
          payload.state = {
            [inspectorNode.label]: inspectorNode.keys.map((key) => ({
              key,
              value: clientData[key].value,
            })),
          }
          return
        }

        // root nodes children state
        if (clientDataKeys.includes(payload.nodeId as ClientDataKey)) {
          payload.state = {
            [DEVTOOLS.INSPECTOR_STATE_SECTION_NAME]: [
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
        api.sendInspectorState(DEVTOOLS.INSPECTOR_ID)
      })
    },
  )
}
