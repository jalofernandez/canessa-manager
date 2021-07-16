<template>
  <nav id="nav" class="navbar navbar-dark bg-dark">
    <router-link to="/" class="nav-link">Home</router-link>
    <router-link v-if="isUserAuth" to="/users" class="nav-link">Users</router-link>
    <router-link to="/blog" class="nav-link">Blog</router-link>
    <router-link v-if="!isUserAuth" to="/register" class="nav-link">Registro</router-link>
    <router-link v-if="!isUserAuth" to="/login" class="nav-link">Login</router-link>
    <button v-if="isUserAuth" @click="closeUserSession()" type="button" class="btn btn-sm btn-outline-warning" >
      <b>LogOut</b>
    </button>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'TheNavbar',
  computed: {
    ...mapGetters(['isUserAuth'])
  },
  methods: {
    ...mapActions(['closeUserSession'])
  }
}
</script>

<style scoped>
.navbar .nav-link {
  color: white;
  font-weight: bold;
}
.navbar .nav-link:hover,
.navbar .nav-link:focus {
  color: #cccccc;
}
.navbar .nav-link.router-link-exact-active {
  color: #42b983;
}
</style>
