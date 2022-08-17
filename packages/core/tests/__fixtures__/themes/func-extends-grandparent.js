import { path } from '@vuepress/utils'
import barPlugin from '../plugins/obj-bar.js'
import funcExtendsParentTheme from './func-extends-parent.js'

export default () => ({
  name: 'theme-func-extends-grandparent',
  extends: funcExtendsParentTheme(),
  layouts: {
    404: path.resolve(__dirname, '../layouts/Bar.vue'),
    Bar: path.resolve(__dirname, '../layouts/Bar.vue'),
  },
  plugins: [barPlugin],
  templateDev: 'theme-func-extends-grandparent-template-dev',
})
