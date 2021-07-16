<template>
  <button @click="actionToggle({ btnBool: btnBool, number: inputNumb })" type="button" class="">
    {{ btnStr }} saldo
  </button>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ToggleBtn',
  props: {
    btnBool: {
      type: Boolean
    },
    inputNumb: {
      type: Number,
      default: 0
    }
  },
  computed: {
    btnStr() {
      return this.btnBool ? 'Aumentar' : 'Disminuir'
    },
  },
  methods: {
    ...mapActions(['actionToggle'])
  }
}
</script>
