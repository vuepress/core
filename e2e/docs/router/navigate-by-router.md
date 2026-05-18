<button id="home" @click="goHome">Home</button>
<button id="not-found" @click="go404">404</button>

<button id="home-with-query" @click="goHomeWithQuery">Home</button>
<button id="home-with-query-and-hash" @click="goHomeWithQueryAndHash">Home</button>
<button id="not-found-with-hash" @click="go404WithHash">404</button>
<button id="not-found-with-complex-hash" @click="go404WithComplexHash">404</button>

<script setup lang="ts">
import { useRouter } from 'vuepress/client';

const router = useRouter();

const goHome = () => {
  router.push('/');
}

const go404 = () => {
  router.push('/404.html');
}

const goHomeWithQuery = () => {
  router.push('/?home=true');
}

const goHomeWithQueryAndHash = () => {
  router.push('/?home=true#home');
}

const go404WithHash = () => {
  router.push('/404.html#_404');
}

const go404WithComplexHash = () => {
  router.push('/404.html#/404?lang=en');
}
</script>
