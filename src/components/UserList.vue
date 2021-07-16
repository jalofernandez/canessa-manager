<template>
  <table class="table table-dark">
    <caption>
      <small>{{ users }}</small>
    </caption>
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Nombre</th>
        <th scope="col">Número</th>
        <th scope="col">Opciones</th>
        <th scope="col">Lenguaje</th>
        <th scope="col">Acción</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="usr in users" :key="usr.id">
        <td scope="row" class="user-id">
          <small>{{ usr.id }}</small>
        </td>
        <td>
          {{ usr.fname }}
        </td>
        <td>
          {{ usr.number }}
        </td>
        <td>
          <small v-for="(option, index) in usr.options" :key="index">
            <!-- [...customer.doggie.breed].sort().join(', ') -->
            {{ usr.options.length === index + 1 ? option : option + ', ' }}
          </small>
        </td>
        <td>
          {{ usr.lang }}
        </td>
        <td>
          <button @click="removeUser(usr.id)" type="button" class="btn btn-sm btn-danger mr-2">
            <b>Eliminar</b>
          </button>
          <!-- <router-link :to="`/users/${usr.id}`" type="button" class="btn btn-sm btn-info"> -->
          <router-link v-if="typeof usr.id !== 'undefined'" :to="{ name: 'Editor', params: { id: usr.id } }" type="button" class="btn btn-sm btn-info">
            <b>Editar</b>
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'UserList',
  computed: {
    ...mapState(['users'])
  },
  methods: {
    ...mapActions(['removeUser'])
  }
}
</script>

<style scoped>
table td:not(.user-id),
table td:not(.user-id) small {
  text-transform: capitalize;
} 
</style>
