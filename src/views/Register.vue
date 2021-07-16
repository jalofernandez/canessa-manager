<template>
  <section class="container">
    <Title txt="Registro de usuario"/>

    <!-- alert with Error messages -->
    <div v-if="err.type != null" class="alert alert-danger mt-4">
      <em>{{ err.msg }}</em>
    </div>

    <form @submit.prevent="submitRegistration()">
      <div class="form-row">
        <div class="col-12 col-sm-6 text-left my-2">
          <!-- text Input -->
          <label for="inputName">
            Nombre: <b>{{ user.name }}</b>
          </label>
          <input
            v-model.trim="user.name"
            id="inputName"
            type="text"
            class="form-control form-control-lg"
            aria-describedby="nameHelp"
            placeholder="Introduce tu nombre de pila"
          >
          <small id="nameHelp" class="form-text text-muted">
            Just your nickname.
          </small>
        </div>
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
      </div>
      <div class="form-row">
        <div class="col-12 col-sm-6 text-left my-2">
          <!-- pass Input -->
          <label for="inputPass">
            Contraseña: <b>{{ user.pass }}</b>
          </label>
          <input
            v-model.trim="user.pass"
            id="inputPass"
            type="password"
            class="form-control form-control-lg"
            aria-describedby="passHelp"
            placeholder="Introduce una contraseña segura"
          >
          <small id="passHelp" class="form-text text-muted">
            Write password with more than {{ passLength }} characters dude!
          </small>
        </div>
        <div class="col-12 col-sm-6 text-left my-2">
          <!-- pass Input -->
          <label for="inputPassRepeat">
            Repite contraseña: <b>{{ user.passRepeat }}</b>
          </label>
          <input
            v-model.trim="user.passRepeat"
            id="inputPassRepeat"
            type="password"
            class="form-control form-control-lg"
            aria-describedby="passRepeatHelp"
            placeholder="Repite la contraseña introducida"
          >
          <small id="passRepeatHelp" class="form-text text-muted">
            Write the same password again!
          </small>
        </div>
      </div>
      <!-- Submit BTN -->
      <button type="submit" class="btn btn-success mt-4" :disabled="disabled">
        <b>Registrar nuevo usuario</b>
      </button>
    </form>

  </section>
</template>

<script>
import Title from '../components/Title.vue'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'Register',
  components: {
    Title
  },
  data() {
    return {
      user: {
        name: '',
        email: '',
        pass: '',
        passRepeat: ''
      },
      passLength: 6 // min required by Google if U want to store it in Firebase DB
    }
  },
  computed: {
    ...mapState(['err']),
    disabled() {
      if (!this.user.email.includes('@')) return true
      if (this.user.pass.length >= this.passLength && this.user.pass === this.user.passRepeat) return false
      else return true
    }
  },
  methods: {
    ...mapActions(['registerUser']),
    /* -- a) without Firebase´s Errors control: */
    // submitRegistration() {
    //   this.registerUser({
    //     name: this.user.name,
    //     email: this.user.email,
    //     password: this.user.pass
    //   })
    //   this.user = {
    //     name: '',
    //     email: '',
    //     pass: '',
    //     passRepeat: ''
    //   }
    // }
    /* -- b) with Firebase´s Errors control: */
    async submitRegistration() {
      await this.registerUser({
        name: this.user.name,
        email: this.user.email,
        password: this.user.pass
      })
      // to avoid clean input fields if any error exist stopin´code run with a "return" statement
      if (this.err.type !== null) return
      // ...to clean input fields if NO errors
      this.user = {
        name: '',
        email: '',
        pass: '',
        passRepeat: ''
      }
    }
  }
}
</script>

<style scoped>
label {
  color: #42b983;
}
</style>
