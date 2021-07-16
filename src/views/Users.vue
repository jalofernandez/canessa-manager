<template>
  <div class="container">
    <Title txt="Formulario de contacto"/>
    <!-- FORM to Add new User and store it globaly with Vuex -->
    <section>
      <form @submit.prevent="setUserData">
        <div class="form-row">
          <div class="col-12 col-sm-6 text-left my-2">
            <!-- text Input ("v-model.trim") -->
            <label for="inputName">Nombre: <b>{{ user.fname }}</b></label>
            <input v-model.trim="user.fname" id="inputName" type="text" class="form-control form-control-lg" aria-describedby="emailHelp" placeholder="Introduce tu nombre de pila">
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div class="col-12 col-sm-6 text-left my-2">
            <!-- number Input ("v-model.number") -->
            <label for="inputNumber">Número: <b>{{ user.number }}</b></label>
            <input v-model.number="user.number" id="inputNumber" type="text" class="form-control form-control-lg" aria-describedby="emailHelp" placeholder="Introduce un número">
            <small id="numberHelp" class="form-text text-muted">
              That´s a f***ckin´numbah!
            </small>
          </div>
        </div>
        <div class="form-row my-2">
          <div class="col-12 col-sm-6 text-left my-2">
            <!-- Checkboxes -->
            <div class="form-check form-check-inline">
              <input v-model="user.options" class="form-check-input" type="checkbox" id="inlineCheckbox1" value="foo">
              <label class="form-check-label" for="inlineCheckbox1">foo</label>
            </div>
            <div class="form-check form-check-inline">
              <input v-model="user.options" class="form-check-input" type="checkbox" id="inlineCheckbox2" value="var">
              <label class="form-check-label" for="inlineCheckbox2">var</label>
            </div>
            <div class="form-check form-check-inline">
              <input v-model="user.options" class="form-check-input" type="checkbox" id="inlineCheckbox3" value="bool">
              <label class="form-check-label" for="inlineCheckbox3">bool</label>
            </div>
          </div>
          <div class="col-12 col-sm-6 text-left my-2">
            <!-- Radio btns -->
            <div class="form-check form-check-inline">
              <input v-model="user.lang" class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="javascript">
              <label class="form-check-label" for="inlineRadio1">JavaScript</label>
            </div>
            <div class="form-check form-check-inline">
              <input v-model="user.lang" class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="python">
              <label class="form-check-label" for="inlineRadio2">Python</label>
            </div>
            <div class="form-check form-check-inline">
              <input v-model="user.lang" class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="php">
              <label class="form-check-label" for="inlineRadio3">PHP</label>
            </div>
          </div>
        </div>
        <!-- Submit BTN -->
        <button type="submit" class="btn btn-success mt-4" :disabled="disabled">
          <b>Nuevo usuario</b>
        </button>
      </form>
      <hr />
      <code>new <b>user</b>: {{ user }}</code>
      <hr />
    </section>

    <section>
      <UserList />
    </section>
  </div>
</template>

<script>
import Title from '@/components/Title.vue'
import UserList from '@/components/UserList.vue'

import { mapActions } from 'vuex'

const shortid = require('shortid') // to call npm "shortid" plugin

export default {
  name: 'About',
  components: {
    Title,
    UserList
  },
  data() {
    return {
      user: {
        id: '',
        fname: '',
        number: 0,
        options: [], // not a String, we need an Array cause Checkboxes allow multioptions selection
        lang: '', // just String cause Radio buttons only allow one option selected
      }
    }
  },
  computed: {
    disabled() {
      return this.user.fname.trim() === '' ? true : false
    }
  },
  methods: {
    ...mapActions(['setUser', 'setDataBase']),
    setUserData() {
      console.log(this.user)
      // 1. All fields validations here as the following example with "fname":
      if (this.user.fname.trim() === '') console.log('Empty name!')

      // 2. ID generation with npm "shortid" plugin:
      this.user.id = shortid.generate()
      console.log(this.user.id)

      // 3. Send user data to "mapAction" to store it globaly (vuex)
      this.setUser(this.user)

      // 4. Clear all fields after form submitted
      this.user = {
        id: '',
        fname: '',
        number: 0,
        options: [],
        lang: ''
      }
    },
  },
  created() {
    this.setDataBase()
  }
}
</script>
