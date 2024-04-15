# AutoLink

<div id="route-link">
  <AutoLink v-for="item in routeLinksConfig" :config="item" />
</div>

<div id="anchor-link">
  <AutoLink v-for="item in anchorLinksConfig" :config="item" />
</div>

<div id="config">
  <AutoLink :config="{ text: 'text', link: '/', ariaLabel: 'label' }" />
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

const anchorLinks = [
  '//example.com',
  'http://example.com',
  'https://example.com',
  'mailto:example@example.com',
  'tel:+1234567890',
]

const anchorLinksConfig = anchorLinks.map((link) => ({ link, text: 'text' }))
</script>
