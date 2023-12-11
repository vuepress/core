## GetPagesPath

<ul class="get-pages-path">
  <li v-for="path in pagesPath">
    {{path}}
  </li>
</ul>

## isPageExist

<div class="is-page-exist">

- /: {{isPageExist('/')}}
- /README.md: {{isPageExist('/README.md')}}
- /index.html: {{isPageExist('/index.html')}}
- /not-exist: {{isPageExist('/not-exist')}}
- /not-exist.html: {{isPageExist('/not-exist.html')}}
- /not-exist.md: {{isPageExist('/not-exist.md')}}
- /zh/: {{isPageExist('/zh/')}}
- /zh: {{isPageExist('/zh')}}

</div>

## resolve

<div class="resolve">

- Clean url: {{JSON.stringify(resolve('/page-data/meta'))}}
- HTML: {{JSON.stringify(resolve('/page-data/meta.html'))}}
- Markdown: {{JSON.stringify(resolve('/page-data/meta.md'))}}

</div>

<script setup>
import { getPagesPath, isPageExist, pagesMap, resolve } from '@vuepress/client'

const pagesPath = getPagesPath();
</script>
