## resolve

- Clean url: {{JSON.stringify(resolve('/page-data/meta'))}}
- HTML: {{JSON.stringify(resolve('/page-data/meta.html'))}}
- Markdown: {{JSON.stringify(resolve('/page-data/meta.md'))}}

<script setup>
import {  resolve } from 'vuepress/client'
</script>
