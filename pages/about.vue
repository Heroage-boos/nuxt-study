<template>
    <div class="con">
        about
    </div>
</template>

<script setup lang="ts">
useServerSeoMeta({
    title: "甜蜜商城",
    ogTitle: "甜蜜商城",
    description: "这是我的甜蜜商城描述，它是天下最好的商城！",
    ogDescription: "这是我的甜蜜商城描述，它是天下最好的商城！",
    ogImage: "https://example.com/image.png",
    twitterCard: "summary_large_image",
})

const title = ref('my title')

//响应式改变网页的标题和描述
useSeoMeta({
    title,
    description: () => `descriptionL${title.value}`
})

//设置过渡
definePageMeta({
  pageTransition: {
    name: 'rotate'
  }
})
</script>

<style  lang="scss">
.con {
    color: $secondary;
}
</style>