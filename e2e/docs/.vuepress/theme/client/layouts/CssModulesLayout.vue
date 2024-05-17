<script setup lang="ts">
import styles from '../styles/styles.module.css'
import variables from '../styles/variables.module.scss'
</script>

<template>
  <div class="e2e-theme-css-modules-layout">
    <main class="e2e-theme-css-modules-layout-content">
      <div id="e2e-theme-css-modules-scss">{{ variables.fooScss }}</div>
      <div id="e2e-theme-css-modules-css" :class="styles.greenText">
        CSS modules green text
      </div>
      <Content />
    </main>
  </div>
</template>
