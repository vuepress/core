import { setupDevtoolsPlugin } from '@vue/devtools-api'
import type { App } from 'vue'
import type { GlobalComputed } from './setupGlobalComputed'

export const setupDevtools = (
  app: App,
  globalComputed: GlobalComputed
): void => {
  setupDevtoolsPlugin(
    {
      app,
      id: 'org.vuejs.vuepress',
      label: 'VuePress',
      packageName: '@vuepress/client',
      homepage: 'https://v2.vuepress.vuejs.org',
      logo: 'https://v2.vuepress.vuejs.org/images/hero.png',
      componentStateTypes: ['VuePress'],
    },
    (api) => {
      api.on.inspectComponent((payload) => {
        payload.instanceData.state.push(
          ...Object.entries(globalComputed).map(([name, item]) => ({
            type: 'VuePress',
            key: name,
            editable: false,
            value: item.value,
          }))
        )
      })
    }
  )
}
