<template>
  <LayoutFrame>
    <template #navbar-before>
      <slot name="navbar-before" />
    </template>
    <template #navbar-after>
      <slot name="navbar-after" />
    </template>

    <template #sidebar-top>
      <slot name="sidebar-top" />
    </template>
    <template #sidebar-bottom>
      <slot name="sidebar-bottom" />
    </template>

    <template #main>
      <Home v-if="frontmatter.home" />

      <Transition
        v-else
        name="fade-slide-y"
        mode="out-in"
        @before-enter="onBeforeEnter"
        @before-leave="onBeforeLeave"
      >
        <Page :key="page.path">
          <template #top>
            <slot name="page-top" />
          </template>
          <template #bottom>
            <slot name="page-bottom" />
          </template>
        </Page>
      </Transition>
    </template>
  </LayoutFrame>
</template>

<script lang="ts">
import { defineComponent, ref, Transition } from 'vue'
import { usePageData, usePageFrontmatter } from '@vuepress/client'
import type { DefaultThemePageFrontmatter } from '../../shared'
import { useScrollPromise } from '../composables'
import Home from '../components/Home.vue'
import Page from '../components/Page.vue'
import LayoutFrame from '../components/LayoutFrame.vue'

export default defineComponent({
  name: 'Layout',

  components: {
    Home,
    Page,
    LayoutFrame,
    Transition,
  },

  setup() {
    const page = usePageData()
    const frontmatter = usePageFrontmatter<DefaultThemePageFrontmatter>()

    // handle scrollBehavior with transition
    const scrollPromise = useScrollPromise()
    const onBeforeEnter = scrollPromise.resolve
    const onBeforeLeave = scrollPromise.pending

    return {
      frontmatter,
      page,
      onBeforeEnter,
      onBeforeLeave,
    }
  },
})
</script>
