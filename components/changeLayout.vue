<template>
    <button @click="enableCustomLayout">
        改变布局
    </button>
</template>

<script setup lang="ts">
//动态改变layout布局  和静态只能生效一种生效
function enableCustomLayout() {
    setPageLayout("layout")//动态改变layout布局
}
definePageMeta({
    layout: false,
});
</script>