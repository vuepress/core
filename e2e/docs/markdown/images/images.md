![logo-public](/logo.png)

![logo-relative](./logo-relative.png)

![logo-unprefix](logo-relative.png)

![logo-alias](@source/markdown/images/logo-relative.png)

<img src="/logo.png" alt="img-logo-public">

<img src="./logo-relative.png" alt="img-logo-relative">

<img src="logo-relative.png" alt="img-logo-unprefix">

<img src="@source/markdown/images/logo-relative.png" alt="img-logo-alias">

<img :src="logoRelative" alt="img-logo-import-relative">

<img :src="imageAlias" alt="img-logo-import-alias">

<script setup>
import imageAlias from '@source/markdown/images/logo-relative.png'
import logoRelative from './logo-relative.png'
</script>
