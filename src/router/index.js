import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Dashboard.vue'
import Login from '../views/Login.vue'

import api from '@/api'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Home,
    meta: {
      acl: "login"
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      acl: "logout"
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      acl: "any"
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {

  if (api.haveApiKey) { // loggedin
    if (to.matched.some(record => record.meta.acl === "logout")) {
      // trying to navigate to a unregistered only endpoint
      next({name: 'Dashboard'})
    } else {
      next()
    }
  } else { // loggedout
    if (to.matched.some(record => record.meta.acl === "login")) {
      next({name: 'Login'})
    } else {
      next()
    }

  }
})

export default router
