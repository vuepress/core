## GetPagesPath

<ul>
  <li v-for="path in pagesPath">
    {{path}}
  </li>
</ul>

<script setup>
import { getPagesPath } from 'vuepress/client'

const pagesPath = getPagesPath();
</script>
