<template>
  <div>
    <h2>Tipo de cuenta: {{ string }}</h2>
    <h5>Características de la cuenta:</h5>
    <ul>
      <li v-for="(str, index) in array" :id="index">
        {{ index + 1 }} - {{ str }}
      </li>
    </ul>
    <!-- without "mapState"
    <h4 v-if="!boolean">Saldo: {{ $store.state.counter }}</h4>
    -->
    <!-- with "mapState" but without "setColorCounter" computed property
    <h4 v-if="!boolean" :class="[counter < 100 ? 'empty' : 'full']">
    -->
    <h4 v-if="!boolean" :class="setColorCounter">
      Saldo: {{ counter }}
    </h4>
    <h4 v-else class="empty">¡Saldo agotado!</h4>
    <hr>
    <!-- without "mapState"
    <TheButton btnStr="Aumentar saldo" @action="more"/>
    <TheButton btnStr="Disminuir saldo" @action="less" :disabled="boolean"/>
    -->
    <!-- with String prop -->
    <TheButton btnStr="Aumentar saldo" @action="actionIncrease(50)"/>
    <TheButton btnStr="Disminuir saldo" @action="actionDecrease(10)" :disabled="setDisabled"/>
    <hr>
    <label>Introducir saldo:</label>
    <input type="number" v-model="input" />
    <b class="full">{{ input }}</b>
    <!-- with Boolean prop and dynamic number value from input field -->
    <ToggleBtn :btnBool="true" :inputNumb="parseInt(input)"/>
    <ToggleBtn :btnBool="false" :inputNumb="parseInt(input)" :disabled="setDisabled"/>
  </div>
</template>

<script>
import TheButton from './TheButton.vue'
import ToggleBtn from './ToggleBtn.vue'

// import { mapState, mapMutations, mapActions } from 'vuex'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Counter',
  components: {
    TheButton,
    ToggleBtn
  },
  computed: {
    ...mapState(['counter','boolean']),
    setColorCounter() {
      return this.counter < 100 ? 'empty' : 'full'
    },
    setDisabled() {
      return this.boolean
    }
  },
  data() {
    return {
      string: 'Visa',
      // number: 200, // now "counter" in store state
      // boolean: false,
      array: ['giro', 'abono', 'transferencia', 'recibo'],
      input: 0
    }
  },
  methods: {
    // Is not recommended use "mapMutations" directly as:
    // ...mapMutations(['increment']),
    // better use "mapActions" to access and trigger "mutations" as:
    ...mapActions(['actionIncrease']),
    ...mapActions(['actionDecrease']),

    /* -- to add or remove counter quantity without vuex "Store" -- */
    // more() {
    //   this.boolean = false
    //   this.number = this.number + 100
    // },
    // less() {
    //   this.number === 0 ? this.boolean = true : this.number = this.number - 100
    //   // if (this.number === 0) this.boolean = true
    //   // else this.number = this.number - 100
    // }
  }
}
</script>

<style scoped>
  ul, ol {
    list-style: none;
    padding: 0;
  }
  .empty {
    color: red
  }
  .full {
    color: green
  }
  input {
    margin: .5rem
  }
</style>
