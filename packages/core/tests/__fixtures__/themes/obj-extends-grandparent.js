import objBarPlugin from '../plugins/obj-bar.js'
import objExtendsParentTheme from './obj-extends-parent.js'

export default {
  name: 'theme-obj-extends-grandparent',
  extends: objExtendsParentTheme,
  plugins: [objBarPlugin],
  templateDev: 'theme-obj-extends-grandparent-template-dev',
}
