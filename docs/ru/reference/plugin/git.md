# git

<NpmBadge package="@vuepress/plugin-git" />

This plugin will collect git information of your pages, including the created and updated time, the contributors, etc.

The [lastUpdated](../default-theme/config.md#lastupdated) and [contributors](../default-theme/config.md#contributors) of default theme is powered by this plugin.

This plugin is mainly used to develop themes. You won't need to use it directly in most cases.

## Usage

```bash
npm i -D @vuepress/plugin-git@next
```

```ts
import { gitPlugin } from '@vuepress/plugin-git'

export default {
  plugins: [
    gitPlugin({
      // options
    }),
  ],
}
```

## Git Repository

This plugin requires your project to be inside a [Git Repository](https://git-scm.com/book/en/Git-Basics-Getting-a-Git-Repository), so that it can collect information from the commit history.

You should ensure all commits are available when building your site. For example, CI workflows usually clone your repository with [--depth 1](https://git-scm.com/docs/git-clone#Documentation/git-clone.txt---depthltdepthgt) to avoid fetching all commits, so you should disable the behavior to make this plugin work properly in CI.

::: warning
This plugin will significantly slow down the speed of data preparation, especially when you have a lot of pages. You can consider disabling this plugin in `dev` mode to get better development experience.
:::

## Options

### createdTime

- Type: `boolean`

- Default: `true`

- Details:

  Whether to collect page created time or not.

### updatedTime

- Type: `boolean`

- Default: `true`

- Details:

  Whether to collect page updated time or not.

### contributors

- Type: `boolean`

- Default: `true`

- Details:

  Whether to collect page contributors or not.

## Frontmatter

### gitInclude

- Type: `string[]`

- Details:

  An array of relative paths to be included when calculating page data.

- Example:

```md
---
gitInclude:
  - relative/path/to/file1
  - relative/path/to/file2
---
```

## Page Data

This plugin will add a `git` field to page data.

After using this plugin, you can get the collected git information in page data:

```ts
import { usePageData } from '@vuepress/client'
import type { GitPluginPageData } from '@vuepress/plugin-git'

export default {
  setup() {
    const page = usePageData<GitPluginPageData>()
    console.log(page.value.git)
  },
}
```

### git.createdTime

- Type: `number`

- Details:

  Unix timestamp in milliseconds of the first commit of the page.

  This attribute would take the minimum of the first commit timestamps of the current page and the files listed in [gitInclude](#gitinclude).

### git.updatedTime

- Type: `number`

- Details:

  Unix timestamp in milliseconds of the last commit of the page.

  This attribute would take the maximum of the last commit timestamps of the current page and the files listed in [gitInclude](#gitinclude).

### git.contributors

- Type: `GitContributor[]`

```ts
interface GitContributor {
  name: string
  email: string
  commits: number
}
```

- Details:

  The contributors information of the page.

  This attribute would also include contributors to the files listed in [gitInclude](#gitinclude).
