<template>
    <div>
        abc-a-{{ id }}
    </div>
</template>

<script setup>
const route = useRoute();
const id = route.params.id
console.log("a", route.params);

//路由验证
definePageMeta({
    validate: async (route) => {
        return /^\d+$/.test(route.params.id)
    }
})
</script>