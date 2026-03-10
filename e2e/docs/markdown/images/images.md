![logo-public](/logo.png)

![logo-relative](./logo-relative.png)

![logo-alias](@image-alias)

<img src="/logo.png" alt="img-logo-public">

<img src="./logo-relative.png" alt="img-logo-relative">

<img src="@image-alias" alt="img-logo-alias">

<img src="image-alias.png" alt="img-logo-alias-ext">

<img :src="imageAlias" alt="img-logo-alias-path">

<img :src="logoRelative" alt="img-logo-relative-path">

<!-- FIXME: not supported yet -->
<!-- ![logo-relative](logo-relative.png) -->

<script setup>
import imageAlias from '@image-alias'
import logoRelative from './logo-relative.png'
</script>
