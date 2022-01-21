import { setupDevtoolsPlugin } from '@vue/devtools-api'
import { defineClientAppEnhance, routeLocaleSymbol } from '@vuepress/client'
import { computed } from 'vue'
import {
  resolveThemeLocaleData,
  themeLocaleDataSymbol,
  useThemeData,
} from './composables'

export default defineClientAppEnhance(({ app }) => {
  // provide theme data & theme locale data
  const themeData = useThemeData()
  const routeLocale =
    app._context.provides[routeLocaleSymbol as unknown as string]
  const themeLocaleData = computed(() =>
    resolveThemeLocaleData(themeData.value, routeLocale.value)
  )
  app.provide(themeLocaleDataSymbol, themeLocaleData)

  Object.defineProperties(app.config.globalProperties, {
    $theme: {
      get() {
        return themeData.value
      },
    },
    $themeLocale: {
      get() {
        return themeLocaleData.value
      },
    },
  })

  // setup devtools in dev mode
  if (__VUEPRESS_DEV__ || __VUE_PROD_DEVTOOLS__) {
    setupDevtoolsPlugin(
      {
        app,
        id: 'org.vuejs.vuepress.plugin-theme-data',
        label: 'VuePress Theme Data Plugin',
        packageName: '@vuepress/plugin-theme-data',
        homepage: 'https://v2.vuepress.vuejs.org',
        logo: 'https://v2.vuepress.vuejs.org/images/hero.png',
        componentStateTypes: ['VuePress'],
      },
      (api) => {
        api.on.inspectComponent((payload) => {
          payload.instanceData.state.push(
            {
              type: 'VuePress',
              key: 'themeData',
              editable: false,
              value: themeData.value,
            },
            {
              type: 'VuePress',
              key: 'themeLocaleData',
              editable: false,
              value: themeLocaleData.value,
            }
          )
        })
      }
    )
  }
})
