<template></template>

<script lang="ts">

export default defineNuxtComponent({
    fetchKey: 'hello',
    async asyncData() {
        return {
            hello: await $fetch('/api/hello')
        }
    }
})
</script>