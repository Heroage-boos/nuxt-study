<template>
  <!-- <NuxtWelcome /> -->
  <div>
    <!-- 当前路由视图，默认pages下index.vue -->
    <NuxtPage />

    <!-- 跳转到某个页面 -->
    <NuxtLink to="/about">about page</NuxtLink>
    <br />
    <NuxtLink to="/abc/a">abc-a page</NuxtLink>
    <br />
    <NuxtLink to="/other">bar1 page</NuxtLink>
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
const id = 10

let layout = "layout"//默认布局  使用其他layouts下.vue文件布局 改变变量即可覆盖默认布局
layout = "custom"

definePageMeta({
  layout: false,
});


//编程式设置html头部
useHead({
  title: "nuxt实践",
  meta: [
    {
      name: "description",
      content: "学习nuxt,模拟nuxt开发"
    }
  ],
  bodyAttrs: {
    class: 'test'
  },
  script: [{ innerHTML: 'console.log(\'Hello world\')' }]
})

</script>

<style lang="scss"></style>