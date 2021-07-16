<template>
  <section class="container">
    <Title txt="Entrar como usuario ya registrado"/>

    <!-- alert with Error messages -->
    <div v-if="err.type != null" class="alert alert-danger mt-4">
      <em>{{ err.msg }}</em>
    </div>

    <form @submit.prevent="submitLogin()">
      <div class="form-row">
        <div class="col-12 col-sm-6 text-left my-2">
          <!-- pass Input -->
          <label for="inputEmail">
            Email: <b>{{ user.email }}</b>
          </label>
          <input
            v-model.trim="user.email"
            :class="[err.type === 'email' ? 'is-invalid' : '']"
            id="inputEmail"
            type="email"
            class="form-control form-control-lg"
            aria-describedby="emailHelp"
            placeholder="Introduce un email de contacto"
          >
          <small id="emailHelp" class="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div class="col-12 col-sm-6 text-left my-2">
          <!-- pass Input -->
          <label for="inputPass">
            Contraseña: <b>{{ user.pass }}</b>
          </label>
          <input
            v-model.trim="user.pass"
            :class="[err.type === 'pass' ? 'is-invalid' : '']"
            id="inputPass"
            type="password"
            class="form-control form-control-lg"
            aria-describedby="passHelp"
            placeholder="Introduce una contraseña segura"
          >
          <small id="passHelp" class="form-text text-muted">
            Write password with at least {{ passLength }} characters dude!
          </small>
        </div>
      </div>
      <!-- Submit BTN -->
      <button type="submit" class="btn btn-success mt-4" :disabled="disabled">
        <b>Entrar | Hacer login</b>
      </button>
    </form>
    
  </section>
</template>

<script>
import Title from '../components/Title.vue'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'Login',
  components: {
    Title
  },
  data() {
    return {
      user: {
        email: '',
        pass: ''
      },
      passLength: 6
    }
  },
  computed: {
    ...mapState(['err']),
    disabled() {
      if (!this.user.email.includes('@')) return true
      if (this.user.pass.length >= this.passLength) return false
      else return true
    }
  },
  methods: {
    ...mapActions(['loginUser']),
    /* -- a) without Firebase´s Errors control: */
    // submitLogin() {
    //   this.loginUser({
    //     email: this.user.email,
    //     password: this.user.pass
    //   })
    //   this.user = {
    //     email: '',
    //     pass: ''
    //   }
    // }
    /* -- b) with Firebase´s Errors control: */
    async submitLogin() {
      await this.loginUser({
        email: this.user.email,
        password: this.user.pass
      })
      // to avoid clean input fields if any error exist stopin´code run with a "return" statement
      if (this.err.type !== null) return
      // ...to clean input fields if NO errors
      this.user = {
        email: '',
        pass: ''
      }
    }
  }
}
</script>

<style>

</style>
