
<template>
   <Head>
        <Title>{{ title }}</Title>
        <Meta name="description" :content="title" />
        <Style type="text/css" children="body { background-color: green; }" />
    </Head>

    <h1>{{ title }}</h1>
</template>


<script setup lang="ts">
const title = ref('Hello World');


</script>
