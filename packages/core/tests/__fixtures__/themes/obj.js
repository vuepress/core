import { path } from '@vuepress/utils'
import objPlugin from '../plugins/obj.js'

export default {
  name: 'theme-obj',
  layouts: {
    Layout: path.resolve(__dirname, '../layouts/Layout.vue'),
    404: path.resolve(__dirname, '../layouts/404.vue'),
  },
  plugins: [objPlugin],
  templateBuild: 'theme-obj-template-build',
  templateDev: 'theme-obj-template-dev',
}
