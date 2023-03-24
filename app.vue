<template>
  <!-- <NuxtWelcome /> -->
  <div>
    <!-- 跳转到某个页面 -->
    <div class="page mt-24" >
      <NuxtLink to="/">index page</NuxtLink>
      <NuxtLink to="/about">about page</NuxtLink>
      <NuxtLink to="/abc/a">abc-a page</NuxtLink>
      <NuxtLink to="/other">other page</NuxtLink>
      <NuxtLink to="/mockApiFetch">apiFetch page</NuxtLink>
    </div>

    <!-- components下的组件 -->
    <changeLayout></changeLayout>

    <!-- <button>改变布局</button> -->
    <!-- layouts   :name="layout"-->
    <NuxtLayout>
      <div class="current-page">
        <div>
          当前页面：{{ route.name }}
        </div>
        <div>
          <NuxtPage />
        </div>

      </div>
    </NuxtLayout>
    <!-- 当前路由视图，默认pages下index.vue -->


  </div>
</template>

<script setup lang="ts">

const route = useRoute()
console.log("route", route)
const id = 10

// let layout = "layout"//默认布局  使用其他layouts下.vue文件布局 改变变量即可覆盖默认布局
// layout = "layout"

definePageMeta({
  layout: false,
});


//编程式设置html头部
// useHead({
//   title: "nuxt实践",
//   meta: [
//     {
//       name: "description",
//       content: "学习nuxt,模拟nuxt开发"
//     }
//   ],
//   bodyAttrs: {
//     class: 'test'
//   },
//   script: [{ innerHTML: 'console.log(\'Hello world\')' }],
//   link: [//使用link来启用google字体
//     {
//       rel: 'preconnect',
//       href: 'https://fonts.googleapis.com'
//     },
//     {
//       rel: 'stylesheet',
//       href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap',
//       crossorigin: ''
//     }
//   ]
// })

//SEO 
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Site Title` : 'Site Title';
  }
})
</script>

<style lang="scss" scoped>
.page {
  display: flex;

  >a {
    margin-right: 24px;
    color: black;
    text-decoration: none;
  }
}

.current-page {

  // border: solid 1px;
}
</style>