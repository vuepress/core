# AutoLink

<div id="route-link">
  <AutoLink v-for="item in routeLinksConfig" :config="item" />
</div>

<div id="external-link">
  <AutoLink v-for="item in externalLinksConfig" :config="item" />
</div>

<div id="config">
  <AutoLink :config="{ text: 'text1', link: '/', ariaLabel: 'label' }" />
  <AutoLink :config="{ text: 'text2', link: 'https://example.com/test/' }" />
</div>

<div id="attrs">
  <AutoLink class="class" :config="{ text: 'text1', link: '/', ariaLabel: 'label', icon: 'icon1' }" />
  <AutoLink id="id" :config="{ text: 'text2', link: 'https://example.com/test/', unknown: 'value' }" />
  <AutoLink download="example-test.png" :config="{ text: 'text3', link: 'https://example.com/test.png' }" />
</div>

<div id="slots">
  <AutoLink :config="{ text: 'text1', link: '/', ariaLabel: 'label', icon: 'icon1' }">
    slot-text
  </AutoLink>
  <AutoLink :config="{ text: 'text2', link: '/', ariaLabel: 'label', icon: 'icon1' }">
    <template v-slot="{ ariaLabel }">{{ ariaLabel }}</template>
  </AutoLink>
  <AutoLink :config="{ text: 'text3', link: '/', ariaLabel: 'label', icon: 'icon1' }">
    <template #before>before</template>
    <template #after>after</template>
  </AutoLink>
  <AutoLink :config="{ text: 'text4', link: '/', ariaLabel: 'label', icon: 'icon1' }">
    <template #before="{ ariaLabel }">before {{ ariaLabel }}</template>
    <template #after="{ ariaLabel }">after {{ ariaLabel }}</template>
  </AutoLink>
</div>

<script setup lang="ts">
import { AutoLink } from 'vuepress/client'

const routeLinks = [
  '/',
  '/README.md',
  '/index.html',
  '/non-existent',
  '/non-existent.md',
  '/non-existent.html',
  '/routes/non-ascii-paths/中文目录名/中文文件名',
  '/routes/non-ascii-paths/中文目录名/中文文件名.md',
  '/routes/non-ascii-paths/中文目录名/中文文件名.html',
  '/README.md#hash',
  '/README.md?query',
  '/README.md?query#hash',
  '/#hash',
  '/?query',
  '/?query#hash',
  '#hash',
  '?query',
  '?query#hash',
  'route-link',
  'route-link.md',
  'route-link.html',
  'not-existent',
  'not-existent.md',
  'not-existent.html',
  '../',
  '../README.md',
  '../404.md',
  '../404.html',
]

const routeLinksConfig = routeLinks.map((link) => ({ link, text: 'text' }))

const externalLinks = [
  '//example.com',
  'http://example.com',
  'https://example.com',
  'mailto:example@example.com',
  'tel:+1234567890',
]

const externalLinksConfig = externalLinks.map((link) => ({ link, text: 'text' }))
</script>
