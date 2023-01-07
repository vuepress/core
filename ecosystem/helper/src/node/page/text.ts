import type { Page } from '@vuepress/core'
import matter from 'gray-matter'
import { md2text } from '../markdown/index.js'

export const getPageText = ({ content }: Page): string =>
  md2text(
    matter(content)
      .content.trim()
      // remove first heading1 as title
      .replace(/^# (.*)$/gm, '')
  )
    // convert link breaks into spaces
    .replace(/(?:\r?\n)+/g, ' ')
    // convert 2 or more spaces into 1
    .replace(/ +/g, ' ')
    // trim
    .trim()
