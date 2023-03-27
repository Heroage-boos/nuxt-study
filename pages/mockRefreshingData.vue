<template>
    <div>

    </div>
</template>

<script setup lang="ts">
const page = ref(1)

//刷新请求数据接口
const { data: users, pending, refresh, error } = await useFetch(() => `users?page=${page.value}&take=6`, { baseURL: "/mock " }
)

//上一页
function previous() {
    page.value--
    refresh()
}

// 下一页
function next() {
    page.value++
    refresh()
}


</script>
