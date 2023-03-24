<template>
    <button @click="enableCustomLayout('layout')">
        layout布局
    </button>
    <button @click="enableCustomLayout('custom')">
        costom布局
    </button>
</template>

<script setup lang="ts">
//动态改变layout布局  和静态只能生效一种生效
function enableCustomLayout(d: string) {
    setPageLayout(d)//动态改变layout布局
}
definePageMeta({
    layout: false,
});
</script>