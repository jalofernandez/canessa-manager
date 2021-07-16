<template>
  <div class="container">
    <Title :txt="`Editar usuario: ${$route.params.id}`"/>
    <section>
      <code>{{ user }}</code>
      <hr/>
      <form @submit.prevent="editUser(user)">
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
        <div class="form-row my-4">
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
        <button type="submit" class="btn btn-success mt-4">
          <b>Guardar edición de usuario</b>
        </button>
      </form>
    </section>
  </div>
</template>

<script>
import Title from '@/components/Title.vue'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'Editor',
  components: {
    Title
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['getUser', 'editUser'])
  },
  created() {
    this.getUser(this.$route.params.id)
  }
}
</script>

<style>

</style>
