import barPlugin from '../plugins/obj-bar.js'
import funcExtendsParentTheme from './func-extends-parent.js'

export default () => ({
  name: 'theme-func-extends-grandparent',
  extends: funcExtendsParentTheme(),
  plugins: [barPlugin],
  templateDev: 'theme-func-extends-grandparent-template-dev',
})
