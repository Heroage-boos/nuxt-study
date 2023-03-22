<template>
    <div>
        pages/index.vue 我是首页
    </div>
    <NuxtLayout name="custom">
        <template #header> Some header template content. </template>
    </NuxtLayout>
</template>


<script setup lang="ts">
definePageMeta({
    layout: false,
});
</script>