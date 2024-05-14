# AutoLink

<div id="route-link">
  <AutoLink v-for="item in routeLinksConfig" v-bind="item" />
</div>

<div id="external-link">
  <AutoLink v-for="item in externalLinksConfig" v-bind="item" />
</div>

<div id="config">
  <AutoLink v-bind="{ text: 'text1', link: '/', ariaLabel: 'label' }" />
  <AutoLink v-bind="{ text: 'text2', link: 'https://example.com/test/' }" />
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
