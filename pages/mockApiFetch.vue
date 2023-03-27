<template>
    <div>
        {{ count }}
    </div>
</template>

<script setup lang="ts">
const { data: count } = await useFetch(() => `api/24k/hot`, {
   params:{
    type:0
   }
   
});

</script>