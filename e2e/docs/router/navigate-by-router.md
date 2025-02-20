<div id="full">
  <button class="home" @click="goHome">Home</button>
  <button class="not-found" @click="go404">404</button>
  <button class="home-with-query" @click="goHomeWithQuery">Home</button>
  <button class="home-with-query-and-hash" @click="goHomeWithQueryAndHash">Home</button>
  <button class="not-found-with-hash" @click="go404WithHash">404</button>
  <button class="not-found-with-hash-and-query" @click="go404WithHashAndQuery">404</button>
</div>

<div id="clean">
  <button class="home" @click="goHome">Home</button>
  <button class="not-found" @click="go404">404</button>
  <button class="home-with-query" @click="goHomeWithQuery">Home</button>
  <button class="home-with-query-and-hash" @click="goHomeWithQueryAndHash">Home</button>
  <button class="not-found-with-hash" @click="go404WithHash">404</button>
  <button class="not-found-with-hash-and-query" @click="go404WithHashAndQuery">404</button>
</div>

<script setup lang="ts">
import { useRouter } from 'vuepress/client';

const router = useRouter();

const goHome = (event) => {
  if (event.currentTarget.parentElement.id === 'full') {
    router.push('/index.html');
  } else {
    router.push('/');
  }
}

const go404 = (event) => {
  if (event.currentTarget.parentElement.id === 'full') {
    router.push('/404.html');
  } else {
    router.push('/404');
  }
}

const goHomeWithQuery = (event) => {
  if (event.currentTarget.parentElement.id === 'full') {
    router.push('/index.html?home=true');
  } else {
    router.push('/?home=true');
  }
}

const goHomeWithQueryAndHash = (event) => {
  if (event.currentTarget.parentElement.id === 'full') {
    router.push('/index.html?home=true#home');
  } else {
    router.push('/?home=true#home');
  }
}

const go404WithHash = (event) => {
  if (event.currentTarget.parentElement.id === 'full') {
    router.push('/404.html#404');
  } else {
    router.push('/404#404');
  }
}

const go404WithHashAndQuery = (event) => {
  if (event.currentTarget.parentElement.id === 'full') {
    router.push('/404.html#404?notFound=true');
  } else {
    router.push('/404#404?notFound=true');
  }
}
</script>
