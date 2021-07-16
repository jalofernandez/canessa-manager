<template>
  <h1>{{ txt }}</h1>
</template>

<script>
export default {
  name: 'Title',
  props: {
    txt: {
      type: String,
      default: 'Mi App de Vue2'
    }
  }
}
</script>

<style scoped>
h1 {
  color: #42b983;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
}
</style>
