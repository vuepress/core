import funcUserStyleParent from './func-user-style-parent.js'

export default () => ({
  name: 'theme-func-user-style-child-override',
  extends: funcUserStyleParent(),
  userStyle: 'child-user-style-override',
})
