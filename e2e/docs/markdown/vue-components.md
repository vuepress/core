<ComponentForMarkdownGlobal />

<ComponentForMarkdownImportFoo />

<ComponentForMarkdownImportBar />

<script setup>
// import via alias
import ComponentForMarkdownImportFoo from '@source/.vuepress/components/ComponentForMarkdownImportFoo.vue';

// import via relative path
import ComponentForMarkdownImportBar from '../.vuepress/components/ComponentForMarkdownImportBar.vue';
</script>
