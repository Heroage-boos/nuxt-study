<template>
    <div>
        pages/index.vue 我是首页
        <img src="~/images/unnamed.webp" />
    </div>
    <!-- <NuxtLayout name="custom">
        <template #header> Some header template content. </template>
    </NuxtLayout> -->
</template>


<script setup lang="ts">
definePageMeta({
    layout: false,
    middleware: "auth"
});

</script>

<style lang="scss" >
.pinka {
    color: $primary;
}
</style>