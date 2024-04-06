<button id="home" @click="goHome">Home</button>
<button id="404" @click="go404">404</button>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
  router.push('/?home=true');
}

const go404 = () => {
  router.push('/404.html#404');
}
</script>
