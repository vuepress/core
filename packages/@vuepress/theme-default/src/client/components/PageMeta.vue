<script setup lang="ts">
import AutoLink from '@theme/AutoLink.vue'
import {
  usePageData,
  usePageFrontmatter,
  useSiteLocaleData,
} from '@vuepress/client'
import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import type {
  DefaultThemeNormalPageFrontmatter,
  DefaultThemePageData,
  NavLink,
} from '../../shared'
import { useThemeLocaleData } from '../composables'
import { resolveEditLink } from '../utils'

const useEditNavLink = (): ComputedRef<null | NavLink> => {
  const themeLocale = useThemeLocaleData()
  const page = usePageData<DefaultThemePageData>()
  const frontmatter = usePageFrontmatter<DefaultThemeNormalPageFrontmatter>()

  return computed(() => {
    const showEditLink =
      frontmatter.value.editLink ?? themeLocale.value.editLink ?? true
    if (!showEditLink) {
      return null
    }

    const {
      repo,
      docsRepo = repo,
      docsBranch = 'main',
      docsDir = '',
      editLinkText,
    } = themeLocale.value

    if (!docsRepo) return null

    const editLink = resolveEditLink({
      docsRepo,
      docsBranch,
      docsDir,
      filePathRelative: page.value.filePathRelative,
      editLinkPattern:
        frontmatter.value.editLinkPattern ?? themeLocale.value.editLinkPattern,
    })

    if (!editLink) return null

    return {
      text: editLinkText ?? 'Edit this page',
      link: editLink,
    }
  })
}

const useLastUpdated = (): ComputedRef<null | string> => {
  const themeLocale = useThemeLocaleData()
  const page = usePageData<DefaultThemePageData>()
  const frontmatter = usePageFrontmatter<DefaultThemeNormalPageFrontmatter>()

  return computed(() => {
    const showLastUpdated =
      frontmatter.value.lastUpdated ?? themeLocale.value.lastUpdated ?? true

    if (!showLastUpdated) return null

    if (!page.value.git?.updatedTime) return null

    const updatedDate = new Date(page.value.git?.updatedTime)

    return updatedDate.toLocaleString()
  })
}

const useContributors = (): ComputedRef<
  null | Required<DefaultThemePageData['git']>['contributors']
> => {
  const themeLocale = useThemeLocaleData()
  const page = usePageData<DefaultThemePageData>()
  const frontmatter = usePageFrontmatter<DefaultThemeNormalPageFrontmatter>()

  return computed(() => {
    const showContributors =
      frontmatter.value.contributors ?? themeLocale.value.contributors ?? true

    if (!showContributors) return null

    return page.value.git?.contributors ?? null
  })
}

const themeLocale = useThemeLocaleData()
const editNavLink = useEditNavLink()
const lastUpdated = useLastUpdated()
const contributors = useContributors()
</script>

<template>
  <footer class="page-meta">
    <div v-if="editNavLink" class="meta-item edit-link">
      <AutoLink class="meta-item-label" :item="editNavLink" />
    </div>

    <div v-if="lastUpdated" class="meta-item last-updated">
      <span class="meta-item-label">{{ themeLocale.lastUpdatedText }}: </span>
      <ClientOnly>
        <span class="meta-item-info">{{ lastUpdated }}</span>
      </ClientOnly>
    </div>

    <div
      v-if="contributors && contributors.length"
      class="meta-item contributors"
    >
      <span class="meta-item-label">{{ themeLocale.contributorsText }}: </span>
      <span class="meta-item-info">
        <template v-for="(contributor, index) in contributors" :key="index">
          <span class="contributor" :title="`email: ${contributor.email}`">
            {{ contributor.name }}
          </span>
          <template v-if="index !== contributors.length - 1">, </template>
        </template>
      </span>
    </div>
  </footer>
</template>
