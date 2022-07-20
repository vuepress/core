import { setupDevtoolsPlugin } from '@vue/devtools-api'
import { watch } from 'vue'
import type { App } from 'vue'
import type { GlobalComputed } from './setupGlobalComputed.js'

const PLUGIN_ID = 'org.vuejs.vuepress'
const PLUGIN_LABEL = 'VuePress'
const PLUGIN_COMPONENT_STATE_TYPE = PLUGIN_LABEL

const INSPECTOR_ID = PLUGIN_ID
const INSPECTOR_LABEL = PLUGIN_LABEL
const INSPECTOR_GLOBAL_COMPUTED_ID = 'global-computed'
const INSPECTOR_GLOBAL_COMPUTED_LABEL = 'Global Computed'

export const setupDevtools = (
  app: App,
  globalComputed: GlobalComputed
): void => {
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
      const globalComputedEntries = Object.entries(globalComputed)
      const globalComputedKeys = Object.keys(globalComputed)
      const globalComputedValues = Object.values(globalComputed)

      // setup component state
      api.on.inspectComponent((payload) => {
        payload.instanceData.state.push(
          ...globalComputedEntries.map(([name, item]) => ({
            type: PLUGIN_COMPONENT_STATE_TYPE,
            editable: false,
            key: name,
            value: item.value,
          }))
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
            id: INSPECTOR_GLOBAL_COMPUTED_ID,
            label: INSPECTOR_GLOBAL_COMPUTED_LABEL,
            children: globalComputedKeys.map((name) => ({
              id: name,
              label: name,
            })),
          },
        ]
      })
      api.on.getInspectorState((payload) => {
        if (payload.inspectorId !== INSPECTOR_ID) return
        if (payload.nodeId === INSPECTOR_GLOBAL_COMPUTED_ID) {
          payload.state = {
            [INSPECTOR_GLOBAL_COMPUTED_LABEL]: globalComputedEntries.map(
              ([name, item]) => ({
                key: name,
                value: item.value,
              })
            ),
          }
        }
        if (globalComputedKeys.includes(payload.nodeId)) {
          payload.state = {
            [INSPECTOR_GLOBAL_COMPUTED_LABEL]: [
              {
                key: payload.nodeId,
                value: globalComputed[payload.nodeId].value,
              },
            ],
          }
        }
      })

      // refresh the component state and inspector state
      watch(globalComputedValues, () => {
        api.notifyComponentUpdate()
        api.sendInspectorState(INSPECTOR_ID)
      })
    }
  )
}
