<template>
  <div id="app">
    <TheNavbar/>
    <router-view/>
  </div>
</template>

<script>
import TheNavbar from './components/TheNavbar.vue'

// import { mapActions } from 'vuex'

export default {
  components: {
    TheNavbar
  },
  // to upload "users" data from Firebase RealtimeDataBase across Vuex store:
  // methods: {
  //   ...mapActions(['setDataBase'])
  // },
  // created() {
  //   this.setDataBase()
  // }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.container {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
</style>
