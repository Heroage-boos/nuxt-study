<template>
    <!-- you will need to handle a loading state -->
    <div v-if="pending">
        Loading ...
    </div>
    <div v-else>
        <div v-for="post in posts">
            <!-- do something -->
        </div>

    </div>
</template>
  
<script setup>
const { pending, data: posts } = useLazyFetch('/api/posts')
</script>