import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import api from "@/api";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.prototype.$api = api

Vue.prototype.$showToast = function (text, type = 'error', local=true) {

  let options = {}
  switch (type) {
    case "error":
      options = {
        title: "Error!",
        variant: "danger"
      }
      break;
    case "user_error":
      options = {
        title: "Something wrong...",
        variant: "warning"
      }
      break;
    case "success":
      options = {
        title: "Success!",
        variant: "success"
      }
      break;
  }

  const bvToast = local ? this.$bvToast : this.$root.$bvToast

  bvToast.toast(text, {
    ...options,
    toaster: 'b-toaster-top-right',
    solid: true,
    appendToast: false
  })
}


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
