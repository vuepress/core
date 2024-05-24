<button id="home-with-query" @click="goHomeWithQuery">Home</button>
<button id="home-with-query-and-hash" @click="goHomeWithQueryAndHash">Home</button>
<button id="not-found-with-hash" @click="go404WithHash">404</button>
<button id="not-found-with-hash-and-query" @click="go404WithHashAndQuery">404</button>

<script setup lang="ts">
import { useRouter } from 'vuepress/client';

const router = useRouter();

const goHomeWithQuery = () => {
  router.push('/?home=true');
}

const goHomeWithQueryAndHash = () => {
  router.push('/?home=true#home');
}

const go404WithHash = () => {
  router.push('/404.html#404');
}

const go404WithHashAndQuery = () => {
  router.push('/404.html#404?notFound=true');
}
</script>
