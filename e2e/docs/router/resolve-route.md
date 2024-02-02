## resolve

### Path

#### Index

- Clean URL: {{ JSON.stringify(resolveRoute('/')) }}
- HTML: {{ JSON.stringify(resolveRoute('/index.html')) }}
- Markdown: {{ JSON.stringify(resolveRoute('/README.md')) }}

#### Non-Index

- Clean URL: {{ JSON.stringify(resolveRoute('/router/resolve-route')) }}
- HTML: {{ JSON.stringify(resolveRoute('/router/resolve-route.html')) }}
- Markdown: {{ JSON.stringify(resolveRoute('/router/resolve-route.md')) }}

#### Non-ASCII

- Clean URL: {{ JSON.stringify(resolveRoute('/routes/non-ascii-paths/中文目录名/中文文件名')) }}
- HTML: {{ JSON.stringify(resolveRoute('/routes/non-ascii-paths/中文目录名/中文文件名.html')) }}
- Markdown: {{ JSON.stringify(resolveRoute('/routes/non-ascii-paths/中文目录名/中文文件名.md')) }}

#### Non-ASCII Encoded

- Clean URL: {{ JSON.stringify(resolveRoute(encodeURI('/routes/non-ascii-paths/中文目录名/中文文件名'))) }}
- HTML: {{ JSON.stringify(resolveRoute(encodeURI('/routes/non-ascii-paths/中文目录名/中文文件名.html'))) }}
- Markdown: {{ JSON.stringify(resolveRoute(encodeURI('/routes/non-ascii-paths/中文目录名/中文文件名.md'))) }}

#### Non-Existent

- Clean URL: {{ JSON.stringify(resolveRoute('/non-existent')) }}
- HTML: {{ JSON.stringify(resolveRoute('/non-existent.html')) }}
- Markdown: {{ JSON.stringify(resolveRoute('/non-existent.md')) }}

#### Route Meta

- Clean URL: {{ JSON.stringify(resolveRoute('/page-data/route-meta')) }}
- HTML: {{ JSON.stringify(resolveRoute('/page-data/route-meta.html')) }}
- Markdown: {{ JSON.stringify(resolveRoute('/page-data/route-meta.md')) }}

<script setup>
import { resolveRoute } from 'vuepress/client'
</script>
