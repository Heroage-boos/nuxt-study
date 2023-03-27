<script setup>
const color = useColor() // Same as useState('color')
const counter = useCounter() // Same as useState('color')

</script>
<template>
  <p>Current color: {{ color }}</p>
  <button @click="counter++">
      +
    </button>
    <button @click="counter--">
      -
    </button>
    <p>Current counter: {{ counter }}</p>
</template>