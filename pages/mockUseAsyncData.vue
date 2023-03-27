<template>
    <div>
        counter: {{ counter }}
    </div>
</template>

<script setup lang="ts">
const { data: counter } = await useAsyncData('count', () =>
    $fetch("api/count")
)
</script>