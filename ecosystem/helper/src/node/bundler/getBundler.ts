import type { App } from '@vuepress/core'

export const getBundlerName = ({
  options: {
    bundler: { name },
  },
}: App): string => name.match(/^@vuepress\/bundler-(.*)$/)?.[1] || name
