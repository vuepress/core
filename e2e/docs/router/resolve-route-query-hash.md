# Resolve Route FullPath

## Includes Query And Hash

- Search Query: {{ JSON.stringify(resolveRoute('/?query=1')) }}
- Hash: {{ JSON.stringify(resolveRoute('/#hash')) }}
- Search Query And Hash: {{ JSON.stringify(resolveRoute('/?query=1#hash')) }}
- Permalink And Search Query: {{ JSON.stringify(resolveRoute('/routes/permalinks/ascii-non-ascii.md?query=1')) }}

<script setup>
import { resolveRoute } from 'vuepress/client'
</script>
