import Vue from 'vue'
import firebase from 'firebase/app'
import App from './App.vue'
import router from './router'

import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyA9Pd-glU-fl_glCUdsTlnqZpz0ZPNkLhU",
  authDomain: "crud-api-e473a.firebaseapp.com",
  databaseURL: "https://crud-api-e473a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "crud-api-e473a",
  storageBucket: "crud-api-e473a.appspot.com",
  messagingSenderId: "681613975113",
  appId: "1:681613975113:web:a24bdd64094d6e2d916998"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

import store from "./store/store";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
