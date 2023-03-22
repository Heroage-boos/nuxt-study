<template>
  <!-- <NuxtWelcome /> -->
  <div>
    <!-- 当前路由视图，默认pages下index.vue -->
    <NuxtPage />

    <!-- 跳转到某个页面 -->
    <NuxtLink to="/">about page</NuxtLink>

    <!-- components下的组件 -->
    <changeLayout></changeLayout>

    <!-- <button>改变布局</button> -->
    <!-- layouts -->
    <NuxtLayout :name="layout">
  
    </NuxtLayout>

  </div>
</template>

<script setup lang="ts">
const route = useRoute()
console.log("route", route)

let layout = "layout"//默认布局  使用其他layouts下.vue文件布局 改变变量即可覆盖默认布局
layout = "custom"



</script>
