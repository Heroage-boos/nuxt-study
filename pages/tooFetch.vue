<template>
    <header>
        <h1>{{ organization.login }}</h1>
        <p>{{ organization.description }}</p>
    </header>
</template>

<script setup>

const [{ data: organization }, { data: repos }] = await Promise.all([
    useFetch(`https://api.github.com/orgs/nuxt`),
    useFetch(`https://api.github.com/orgs/nuxt/repos`)
])
console.log('organization', organization);
console.log('repos', repos);
</script>