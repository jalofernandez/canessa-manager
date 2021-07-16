/* -- ( vue3 ) -- */
// import { createStore } from 'vuex'

// export default createStore({
//   state: {
//     counter: 100
//   },
//   mutations: {},
//   actions: {},
//   modules: {}
// })

/* -- ( vue2 ) -- */
import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router' // to enable "routes" to can navigate between pages

Vue.use(Vuex)

/* -- ( vue3 ) -- */
// const store = new Vuex.Store({
  
/* -- ( vue2 ) -- */
export default new Vuex.Store({

  /* --  1. All static data (previously one without changes or updates) placed here: -- */
  state: {
    counter: 250,
    boolean: false,

    // -> "new user" Form in About page
    users: [],
    user: {
      id: '',
      fname: '',
      number: 0,
      options: [], // not a String, we need an Array cause Checkboxes allow multioptions selection
      lang: '', // just String cause Radio buttons only allow one option selected
    },

    // -> to handle errors coming from Firebase in "loginUser" action
    err: {
      type: null,
      msg: null
    },

    // -> "new registeredUser" Form in Register page
    registeredUser: null

  },

  // 2. The only way to update all "state" static data is with:
  mutations: {
    // we need to pass "state" as a param to can access it. Payload is a var (prop)
    increment(state, payload) {
      state.boolean = false
      state.counter = state.counter + payload
      // state.counter++ // just increase counter in 1 per click
    },
    decrement(state, payload) {
      state.counter <= 0 ? state.boolean = true : state.counter = state.counter - payload
      // state.counter-- // just decrease counter in 1 per click
    },

    /* -> "new user" Form in About page -- */
    // -----------------------------------
    loadStorage(state, payload) {
      state.users = payload
      console.log(`👌 -> loadStorage() with ${state.users.length} users`)
    },

    createUser(state, payload) {
      state.users.push(payload)
      console.log(`✨ -> createUser() user: ${payload.id} | ${payload.fname}`)
    },

    deleteUser(state, payload) {
      state.users = state.users.filter(usr => usr.id !== payload)
      console.log('🔥 -> deleteUser() user removed')
    },

    readUser(state, payload) {
      if (!state.users.find(usr => usr.id === payload)) {
        router.push('/users')
        return // if user don´t exist go back to (users table) Users page
      }
      state.user = state.users.find(usr => usr.id === payload)
      console.log('🔄 -> readUser() user edition page')
    },

    updateUser(state, payload) {
      state.users = state.users.map(usr => usr.id === payload.id ? payload : usr)
      // console.log("updated: " + state.users[0].lang)
      router.push('/users')
    },

    /* -> "new registeredUser" Form in Register page -- */
    // ------------------------------------------------
    setRegisteredUser(state, payload) {
      payload === null ? console.log("(logout) -> " + payload) : console.log("(mutation) -> " + payload.email)

      state.registeredUser = payload
    },

    /* -> to handle errors coming from Firebase in "loginUser" action -- */
    // -----------------------------------------------------------------
    handleErrors(state, payload) {
      // if there is no Firebase´s errors...
      if (payload === null) {
        state.err = {
          type: null,
          msg: null
        }
      }
      // ...but in case of error exist just handle all cases:
      // 1. case "email" failure (login):
      if (payload === 'EMAIL_NOT_FOUND') {
        state.err = {
          type: 'email',
          msg: 'Email no registrado. Asegúrate de escribir el email con el que te registraste.'
        }
      }
      // 2. case "pass" failure (login):
      if (payload === 'INVALID_PASSWORD') {
        state.err = {
          type: 'pass',
          msg: 'Contraseña inválida. No se corresponde con la que tenemos almacenada.'
        }
      }
      // 3. case "email" failure (register):
      if (payload === 'EMAIL_EXISTS') {
        state.err = {
          type: 'email',
          msg: 'Este email ya existe. Prueba con otro.'
        }
      }
      // 4. case "email" failure (register):
      if (payload === 'INVALID_EMAIL') {
        state.err = {
          type: 'email',
          msg: 'Este email es inválido. Necesitamos un email real.'
        }
      }
      console.log(`
        --- ( handleErrors ) ---
        error.message: ${payload}
        --- ( state.err ) ---
        state.err.type: ${state.err.type}
        state.err.msg: ${state.err.msg}
      `)
    }

  },

  /* -- 3. To access "mutations" and trigger them -- */
  actions: {
    // counter in Home page
    actionIncrease({commit}, number) {
      commit('increment', number)
    },
    actionDecrease({commit}, number) {
      commit('decrement', number)
    },
    actionToggle({commit}, obj) {
      obj.btnBool ? commit('increment', obj.number) : commit('decrement', obj.number)
    },

    /* -- "new user" Form in Users page loads & storage in RealTimeDB from Firebase -- */
    
    async setDataBase({ commit, state }) {
      // a) Loads "users" data from browser´s local storage if it exist...
      const getUserStorage = localStorage.getItem('loginUser')
      if (getUserStorage) {
        commit('setRegisteredUser', JSON.parse(getUserStorage))
      } else {
        return commit('setRegisteredUser', null) // ...if it not set "user" data to inital state and NOT continue with code run
      }

      // b) Loads all "users" data from RealTimeDB in Firebase
      try {
        const response = await fetch(`https://crud-api-e473a-default-rtdb.europe-west1.firebasedatabase.app/users/${state.registeredUser.localId}.json?auth=${state.registeredUser.idToken}`)
        const dataDB = await response.json()
        // console.log(`${dataDB['UhdSb_dKm'].fname} ... 🔥 ⬇️`)

        // c) Create new Array to push by ID all "users" data from RealTimeDB in Firebase
        const arrUsers = []
        for (let id in dataDB) {
          console.log(`✨ -> ${dataDB[id].fname}`)
          arrUsers.push(dataDB[id])
        }

        commit('loadStorage', arrUsers)

      } catch(e) {
        console.log('💀 ' + e.message)
        alert('💀 ' + e.message)
      }
    },

    async setUser({commit, state}, user) {
      // 2. write new "user" data into RealTimeDB in Firebase
      try {
        const response = await fetch(`https://crud-api-e473a-default-rtdb.europe-west1.firebasedatabase.app/users/${state.registeredUser.localId}/${user.id}.json?auth=${state.registeredUser.idToken}`, {
          method: 'PUT', // Firebase method to write into DB ('GET' by default to read info)
          headers: {
            'Content-Type': 'application/json' // http2 response not necessary in Firebase cause 
          },
          body: JSON.stringify(user) // to carry "user" info and parse it to json file
        })
        const dataDB = await response.json() // convert "users" data from Firebase into json obj file
        console.log(`
          -- ( set dataDB ) --
          ${dataDB.id}
          ${dataDB.fname}
          ... 🔥 ⬆️
        `)
        commit('createUser', dataDB)
      } catch(e) {
        console.log('💀 ' + e.message)
        alert('💀 ' + e.message)
      }
    },

    async removeUser({commit, state}, id) {
      try {
        await fetch(`https://crud-api-e473a-default-rtdb.europe-west1.firebasedatabase.app/users/${state.registeredUser.localId}/${id}.json?auth=${state.registeredUser.idToken}`, {
          method: 'DELETE' // Firebase method to write into DB ('GET' by default to read info)
        })
        commit('deleteUser', id)
      } catch(e) {
        console.log('💀 ' + e.message)
        alert('💀 ' + e.message)
      }
    },

    async editUser({commit, state}, user) {
      try {
        const response = await fetch(`https://crud-api-e473a-default-rtdb.europe-west1.firebasedatabase.app/users/${state.registeredUser.localId}/${user.id}.json?auth=${state.registeredUser.idToken}`, {
          method: 'PATCH', // Firebase method to write into DB ('GET' by default to read info)
          // headers: {
          //   'Content-Type': 'application/json' // http2 response not necessary in Firebase cause 
          // },
          body: JSON.stringify(user) // to carry "user" info and parse it to json file
        })
        console.log('editUser(): ' + user.fname)
        commit('updateUser', user)
      } catch(e) {
        console.log('💀 ' + e.message)
        alert('💀 ' + e.message)
      }
    },

    getUser({commit}, id) {
      commit('readUser', id)
    },

    /* -- "loginUser" Form in Login page loaded from RealTimeDB into Firebase -- */

    async loginUser({commit}, loginUser) {
      try {
        console.log(loginUser)
        // a) try to indentify the current user with users data stored in Firebase´s Authentication 
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA9Pd-glU-fl_glCUdsTlnqZpz0ZPNkLhU', {
          method: 'POST',
          body: JSON.stringify({
            email: loginUser.email,
            password: loginUser.password,
            returnSecureToken: true
          })
        })
        const userDB = await response.json()

        console.log(`(login) -> ${userDB.email}`)

        // b) if Firebase server return an error we need to catch it:
        if (userDB.error) {
          console.log(userDB.error)
          // alert('¡Email o contraseña incorrectos! Prueba de nuevo')
          return commit('handleErrors', userDB.error.message)
        }

        // c) inject new user data in "registeredUser" obj in state...
        commit('setRegisteredUser', userDB)
        // ...and clean all errors in state too
        commit('handleErrors', null)

        // d) redirect to user task list page
        router.push('/users')

        // e) store user token in local storage to keep session open
        localStorage.setItem('loginUser', JSON.stringify(userDB))

      } catch(e) {
        console.log(e.message)
        alert(e.message)
      }
    },

    /* -- "new registeredUser" Form in Register page loads & storage in RealTimeDB from Firebase -- */

    async registerUser({commit}, registeredUser) {
      console.log(registeredUser)
      // a) try to push new user into users data stored in Firebase´s Authentication
      try {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA9Pd-glU-fl_glCUdsTlnqZpz0ZPNkLhU', {
          method: 'POST',
          body: JSON.stringify({
            // name: registeredUser.name,
            email: registeredUser.email,
            password: registeredUser.password,
            returnSecureToken: true
          })
        })
        const userDB = await response.json()

        console.log(`(register) -> ${userDB.email}`)

        // b) if Firebase server return an error we need to catch it:
        if (userDB.error) {
          console.log(userDB.error)
          return commit('handleErrors', userDB.error.message)
        }

        // c) inject new user data in "registeredUser" obj in state...
        commit('setRegisteredUser', userDB)
        // ...and clean all errors in state too
        commit('handleErrors', null)

        console.log(`
          --- ( userDB ) ---
          userDB.email: ${userDB.email}
          userDB.expiresIn: ${userDB.expiresIn}
          userDB.idToken: ${userDB.idToken}
          userDB.kind: ${userDB.kind}
          userDB.localId: ${userDB.localId}
          userDB.refreshToken: ${userDB.refreshToken}
        `)

        // d) redirect to user task list page
        router.push('/users')

        // e) store user token in local storage to keep session open
        localStorage.setItem('loginUser', JSON.stringify(userDB))

      } catch(e) {
        console.log(e.message)
        alert(e.message)
      }
    },

    /* -- "LogOut" Button in top main Navbar comp. to close access into a RealTimeDB from Firebase -- */

    closeUserSession({commit}) {
      commit('setRegisteredUser', null)
      router.push('/login')
      localStorage.removeItem('loginUser') // without params, obviously
    }

  },

  /* to allow "state" info across webapp cause use "state" directly is not recommended */
  getters: {
    isUserAuth(state) {
      return !!state.registeredUser
    }
  },

  modules: {}
})
