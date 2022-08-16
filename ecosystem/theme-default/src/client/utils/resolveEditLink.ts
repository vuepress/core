import {
  isLinkHttp,
  removeEndingSlash,
  removeLeadingSlash,
} from '@vuepress/shared'
import { resolveRepoType } from './resolveRepoType.js'
import type { RepoType } from './resolveRepoType.js'

export const editLinkPatterns: Record<Exclude<RepoType, null>, string> = {
  GitHub: ':repo/edit/:branch/:path',
  GitLab: ':repo/-/edit/:branch/:path',
  Gitee: ':repo/edit/:branch/:path',
  Bitbucket:
    ':repo/src/:branch/:path?mode=edit&spa=0&at=:branch&fileviewer=file-view-default',
}

const resolveEditLinkPatterns = ({
  docsRepo,
  editLinkPattern,
}: {
  docsRepo: string
  editLinkPattern?: string
}): string | null => {
  if (editLinkPattern) {
    return editLinkPattern
  }

  const repoType = resolveRepoType(docsRepo)
  if (repoType !== null) {
    return editLinkPatterns[repoType]
  }

  return null
}

export const resolveEditLink = ({
  docsRepo,
  docsBranch,
  docsDir,
  filePathRelative,
  editLinkPattern,
}: {
  docsRepo: string
  docsBranch: string
  docsDir: string
  filePathRelative: string | null
  editLinkPattern?: string
}): string | null => {
  if (!filePathRelative) return null

  const pattern = resolveEditLinkPatterns({ docsRepo, editLinkPattern })
  if (!pattern) return null

  return pattern
    .replace(
      /:repo/,
      isLinkHttp(docsRepo) ? docsRepo : `https://github.com/${docsRepo}`
    )
    .replace(/:branch/, docsBranch)
    .replace(
      /:path/,
      removeLeadingSlash(`${removeEndingSlash(docsDir)}/${filePathRelative}`)
    )
}
