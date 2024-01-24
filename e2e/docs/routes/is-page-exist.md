# isPageExist

- /: {{isPageExist('/')}}
- /README.md: {{isPageExist('/README.md')}}
- /index.html: {{isPageExist('/index.html')}}
- /not-exist: {{isPageExist('/not-exist')}}
- /not-exist.html: {{isPageExist('/not-exist.html')}}
- /not-exist.md: {{isPageExist('/not-exist.md')}}
- /routes/non-ascii-paths/中文目录名/中文文件名.md: {{isPageExist('/routes/non-ascii-paths/中文目录名/中文文件名.md')}}
- /routes/non-ascii-paths/中文目录名/中文文件名.html: {{isPageExist('/routes/non-ascii-paths/中文目录名/中文文件名.html')}}
- {{encodeURI('/routes/non-ascii-paths/中文目录名/中文文件名.md')}}: {{isPageExist(encodeURI('/routes/non-ascii-paths/中文目录名/中文文件名.md'))}}
- {{encodeURI('/routes/non-ascii-paths/中文目录名/中文文件名.html')}}: {{isPageExist(encodeURI('/routes/non-ascii-paths/中文目录名/中文文件名.html'))}}
- /zh/: {{isPageExist('/zh/')}}
- /zh: {{isPageExist('/zh')}}

<script setup>
import { isPageExist } from 'vuepress/client'
</script>
