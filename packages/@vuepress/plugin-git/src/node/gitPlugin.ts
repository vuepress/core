import type { Page, Plugin } from '@vuepress/core'
import type { GitPluginPageData } from './types'
import {
  checkGitRepo,
  getContributors,
  getCreatedTime,
  getUpdatedTime,
} from './utils'

/**
 * Options of @vuepress/plugin-git
 */
export interface GitPluginOptions {
  /**
   * Whether to get the created time of a page
   */
  createdTime?: boolean

  /**
   * Whether to get the updated time of a page
   */
  updatedTime?: boolean

  /**
   * Whether to get the contributors of a page
   */
  contributors?: boolean
}

export const gitPlugin: Plugin<GitPluginOptions> = (
  { createdTime, updatedTime, contributors },
  app
) => {
  const cwd = app.dir.source()
  const isGitRepoValid = checkGitRepo(cwd)

  return {
    name: '@vuepress/plugin-git',

    extendsPage: async (page: Page<GitPluginPageData>) => {
      page.data.git = {}

      if (!isGitRepoValid || page.filePathRelative === null) {
        return
      }

      if (createdTime !== false) {
        page.data.git.createdTime = await getCreatedTime(
          page.filePathRelative,
          cwd
        )
      }

      if (updatedTime !== false) {
        page.data.git.updatedTime = await getUpdatedTime(
          page.filePathRelative,
          cwd
        )
      }

      if (contributors !== false) {
        page.data.git.contributors = await getContributors(
          page.filePathRelative,
          cwd
        )
      }
    },
  }
}

export default gitPlugin
