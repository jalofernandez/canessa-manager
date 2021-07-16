/* -- ( vue3 ) -- */
// import { createRouter, createWebHistory} from 'vuex'
// import Home from '../views/Home.vue'


/* -- ( vue2 ) -- */
import Vue from 'vue'
import VueRouter from 'vue-router'
// ( route creation option 1 )
import Home from '../views/Home.vue'

import store from '../store/store'

Vue.use(VueRouter)

const routes = [
  // ( route creation option 1 )
  {
    path: '/',
    name: 'Home',
    component: Home,
    // "meta" property is useful to add custom obj to enable features as protected routes, etc.
    meta: { protectedRoutes: false } // set to "true" the protected routes U want
  },
  // ( route creation option 2 )
  {
    path: '/users',
    name: 'Users',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Users.vue'),
    meta: { protectedRoutes: false } // set to "true" the protected routes U want
  },
  {
    path: '/users/:id',
    name: 'Editor',
    component: () => import(/* webpackChunkName: "editor" */ '../views/Editor.vue'),
    meta: { protectedRoutes: false } // set to "true" the protected routes U want
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import(/* webpackChunkName: "blog" */ '../views/Blog.vue'),
    meta: { protectedRoutes: false } // set to "true" the protected routes U want
  },
  {
    path: '/blog/:id',
    name: 'Article',
    component: () => import(/* webpackChunkName: "article" */ '../views/Article.vue'),
    meta: { protectedRoutes: false } // set to "true" the protected routes U want
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
    meta: { protectedRoutes: false } // set to "true" the protected routes U want
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: { protectedRoutes: false } // set to "true" the protected routes U want
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// to access all routes before print them:
//   "to" -> access to a property per route link
// "from" -> 
// "next" -> do something with these routes
router.beforeEach((to, from, next) => {
  console.log('meta prop in Router: ' + to.meta.protectedRoutes)
  if (to.meta.protectedRoutes) {
    store.getters.registeredUser ? next() : next('/login')
  } else {
    next()
  }
})

export default router
