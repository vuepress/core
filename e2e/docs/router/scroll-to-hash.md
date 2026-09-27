<button id="same-page-target" @click="goSamePageTarget">Same page target</button>
<button id="same-page-complex-target" @click="goSamePageComplexTarget">Same page target with a complex id</button>
<button id="another-page-target" @click="goAnotherPageTarget">Another page target</button>
<button id="another-page" @click="goAnotherPage">Another page without a hash</button>

## Links

- [Another page target](./scroll-to-hash-target.md#target)

<div class="spacer"></div>

## Target

Target content

<div class="spacer"></div>

<h2 id="target:1">Target with a complex id</h2>

Target content

<div class="spacer"></div>

<script setup lang="ts">
import { useRouter } from 'vuepress/client';

const router = useRouter();

const goSamePageTarget = () => {
  router.push('#target');
}

const goSamePageComplexTarget = () => {
  router.push('#target:1');
}

const goAnotherPageTarget = () => {
  router.push('/router/scroll-to-hash-target.html#target');
}

const goAnotherPage = () => {
  router.push('/router/scroll-to-hash-target.html');
}
</script>

<style>
.spacer {
  height: 1000px;
}

#target,
#target\:1 {
  /* keep the anchor target away from the top of the viewport */
  scroll-margin-top: 100px;
}
</style>
