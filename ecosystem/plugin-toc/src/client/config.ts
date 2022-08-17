import { defineClientConfig } from '@vuepress/client'
import { h } from 'vue'
import type { TocPropsOptions } from '../shared/index.js'
import { Toc } from './components/Toc.js'

declare const __TOC_COMPONENT_NAME__: string
declare const __TOC_DEFAULT_PROPS_OPTIONS__: TocPropsOptions

const defaultPropsOptions = __TOC_DEFAULT_PROPS_OPTIONS__

export default defineClientConfig({
  enhance({ app }) {
    // wrap the toc component with default options
    app.component(__TOC_COMPONENT_NAME__, (props) =>
      h(Toc, {
        headers: props.headers,
        options: {
          ...defaultPropsOptions,
          ...props.options,
        },
      })
    )
  },
})
