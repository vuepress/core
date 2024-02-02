## resolve

### Path

#### Index

- Clean URL: {{ JSON.stringify(resolvePage('/')) }}
- HTML: {{ JSON.stringify(resolvePage('/index.html')) }}
- Markdown: {{ JSON.stringify(resolvePage('/README.md')) }}

#### Non-Index

- Clean URL: {{ JSON.stringify(resolvePage('/router/resolve-page')) }}
- HTML: {{ JSON.stringify(resolvePage('/router/resolve-page.html')) }}
- Markdown: {{ JSON.stringify(resolvePage('/router/resolve-page.md')) }}

#### Non-ASCII

- Clean URL: {{ JSON.stringify(resolvePage('/routes/non-ascii-paths/中文目录名/中文文件名')) }}
- HTML: {{ JSON.stringify(resolvePage('/routes/non-ascii-paths/中文目录名/中文文件名.html')) }}
- Markdown: {{ JSON.stringify(resolvePage('/routes/non-ascii-paths/中文目录名/中文文件名.md')) }}

#### Non-ASCII Encoded

- Clean URL: {{ JSON.stringify(resolvePage(encodeURI('/routes/non-ascii-paths/中文目录名/中文文件名'))) }}
- HTML: {{ JSON.stringify(resolvePage(encodeURI('/routes/non-ascii-paths/中文目录名/中文文件名.html'))) }}
- Markdown: {{ JSON.stringify(resolvePage(encodeURI('/routes/non-ascii-paths/中文目录名/中文文件名.md'))) }}

#### Non-Existent

- Clean URL: {{ JSON.stringify(resolvePage('/non-existent')) }}
- HTML: {{ JSON.stringify(resolvePage('/non-existent.html')) }}
- Markdown: {{ JSON.stringify(resolvePage('/non-existent.md')) }}

#### Meta

- Clean URL: {{ JSON.stringify(resolvePage('/page-data/meta')) }}
- HTML: {{ JSON.stringify(resolvePage('/page-data/meta.html')) }}
- Markdown: {{ JSON.stringify(resolvePage('/page-data/meta.md')) }}

<script setup>
import { resolvePage } from 'vuepress/client'
</script>
