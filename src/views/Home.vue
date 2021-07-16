<template>
  <section class="home container">
    {{ id }}
    <img alt="Vue logo" src="../assets/logo.png" width="80" height="80">
    <Title txt="CRUD con Vue2 CLI + Vuex + Router + Firebase"/>
    <Counter/>
  </section>
</template>

<script>
// @ is an alias to /src
import Title from '@/components/Title.vue'
import Counter from '@/components/Counter.vue'

export default {
  name: 'Home',
  components: {
    Title,
    Counter
  },
  data() {
    return {
      id: this.$route.params.id,
    }
  }
}
</script>
