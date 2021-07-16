<template>
  <button @click="action" type="button" class="">
    {{ btnStr }}
  </button>
</template>

<script>
export default {
  mane: 'TheButton',
  props: {
    btnStr: {
      type: String,
      default: 'Botón'
    }
  },
  methods: {
    action() {
      this.$emit('action')
    }
  }
}
</script>
