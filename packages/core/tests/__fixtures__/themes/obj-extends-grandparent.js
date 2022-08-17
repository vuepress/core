import { path } from '@vuepress/utils'
import objBarPlugin from '../plugins/obj-bar.js'
import objExtendsParentTheme from './obj-extends-parent.js'

export default {
  name: 'theme-obj-extends-grandparent',
  extends: objExtendsParentTheme,
  layouts: {
    404: path.resolve(__dirname, '../layouts/Bar.vue'),
    Bar: path.resolve(__dirname, '../layouts/Bar.vue'),
  },
  plugins: [objBarPlugin],
  templateDev: 'theme-obj-extends-grandparent-template-dev',
}
