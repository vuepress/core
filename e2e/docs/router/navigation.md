<button id="home" @click="goHome">Home</button>
<button id="not-found" @click="go404">404</button>

<script setup lang="ts">
import { useRouter } from 'vuepress/client';

const router = useRouter();

const goHome = () => {
  router.push('/?home=true');
}

const go404 = () => {
  router.push('/404.html#404');
}
</script>
